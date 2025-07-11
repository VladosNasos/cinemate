// lib/api.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

/* ---------- очередь на время refresh ---------- */
interface TokenPayload { accessToken: string; refreshToken?: string }
interface QueuedRequest {
  resolve: (v: AxiosResponse | PromiseLike<AxiosResponse>) => void
  reject:  (reason?: unknown) => void
  config:  AxiosRequestConfig
}

let isRefreshing = false
let failedQueue: QueuedRequest[] = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) reject(error)
    else {
      if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
      resolve(axios(config))
    }
  })
  failedQueue = []
}

/* ---------- CORRECT baseURL ---------- */
const envUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim()
const baseURL =
  envUrl && envUrl.toLowerCase().startsWith("http")
    ? envUrl                                     // абсолютный URL из .env
    : "http://cinemate.ddns.net:8081/api/v1"     // прямой адрес бэкенда

/* ---------- Axios instance ---------- */
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

/* ---------- request: прикручиваем accessToken ---------- */
api.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  if (cfg.headers?.disableAuth) {
    delete cfg.headers.disableAuth
    return cfg
  }

  if (typeof window !== "undefined") {
    const t = localStorage.getItem("accessToken")
    if (t) cfg.headers.Authorization = `Bearer ${t}`
  }
  return cfg
})
/* ---------- response: одно обновление refresh-token ---------- */
api.interceptors.response.use(
  (r) => r,
  async (err: AxiosError): Promise<AxiosResponse> => {
    const original = err.config as AxiosRequestConfig & { _retry?: boolean }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true

      if (isRefreshing) {
        return new Promise<AxiosResponse>((res, rej) => {
          failedQueue.push({ resolve: res, reject: rej, config: original })
        })
      }

      isRefreshing = true
      const refresh = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
      if (!refresh) { isRefreshing = false; return Promise.reject(err) }

      try {
        const { data } = await axios.post<TokenPayload>(
          `${baseURL}/auth/update-access-token`,
          { accessToken: refresh },
          { headers: { "Content-Type": "application/json" } },
        )

        localStorage.setItem("accessToken", data.accessToken)
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken)

        processQueue(null, data.accessToken)
        if (original.headers) original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch (e) {
        processQueue(e, null)
        localStorage.clear()
        if (typeof window !== "undefined") window.location.href = "/login"
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  },
)

export default api
