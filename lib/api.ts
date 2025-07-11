// lib/api.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
interface TokenPayload {
  accessToken: string
  refreshToken?: string
}

interface QueuedRequest {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void
  reject: (reason?: unknown) => void
  config: AxiosRequestConfig
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
// • В браузере ходим на относительный /api/v1 → прокси из next.config переправит
// • Если переменная окружения задана — она перекроет относительный путь
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1"

// -----------------------------------------------------------------------------
// Refresh-token queue helpers
// -----------------------------------------------------------------------------
let isRefreshing = false
let failedQueue: QueuedRequest[] = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    } else {
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
      resolve(axios(config))
    }
  })
  failedQueue = []
}

// -----------------------------------------------------------------------------
// Axios instance
// -----------------------------------------------------------------------------
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

// -----------------------------------------------------------------------------
// REQUEST INTERCEPTOR – attach access token if we have one
// -----------------------------------------------------------------------------
api.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")
      if (token) cfg.headers.Authorization = `Bearer ${token}`
    }
    return cfg
  },
)

// -----------------------------------------------------------------------------
// RESPONSE INTERCEPTOR – on 401 refresh once, queueing concurrent calls
// -----------------------------------------------------------------------------
api.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  async (err: AxiosError): Promise<AxiosResponse> => {
    const original = err.config as AxiosRequestConfig & { _retry?: boolean }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: original })
        })
      }

      isRefreshing = true
      const refreshToken =
        typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null

      if (!refreshToken) {
        isRefreshing = false
        return Promise.reject(err)
      }

      try {
        const { data } = await axios.post<TokenPayload>(
          `${baseURL}/auth/update-access-token`,
          { accessToken: refreshToken },
          { headers: { "Content-Type": "application/json" } },
        )

        // Persist fresh tokens
        localStorage.setItem("accessToken", data.accessToken)
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken)

        processQueue(null, data.accessToken)

        // Replay the original call with new token
        if (original.headers) {
          original.headers["Authorization"] = `Bearer ${data.accessToken}`
        }
        return api(original)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        localStorage.clear()
        if (typeof window !== "undefined") window.location.href = "/login"
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  },
)

export default api
