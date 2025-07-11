import api from "./api";

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}


/**
 * POST /auth/register ⇒ returns JWT pair
 */
export const register = async (
  body: RegisterPayload
): Promise<AuthResult> => {
  const { data } = await api.post<AuthResult>("/auth/register", body);
  return data;
};

/**
 * POST /auth/login
 * Uses HTTP Basic Auth (Authorization: Basic base64(username:password))
 */
export const login = async ({ email, password }: LoginPayload): Promise<AuthResult> => {
  const basic = btoa(`${email}:${password}`);
  const { data } = await api.post<AuthResult>(
    "/auth/login",
    undefined, // no JSON body
    { headers: { Authorization: `Basic ${basic}` } }
  );
  return data;
};


/**
 * POST /auth/logout ⇒ void
 */
export const logout = async (refreshToken: string): Promise<void> => {
  await api.post("/auth/logout", { refreshToken });
};

/**
 * POST /auth/forgot-password ⇒ void (emails reset link)
 */
export const forgotPassword = async (
  body: ForgotPasswordPayload
): Promise<void> => {
  await api.post("/auth/forgot-password", body);
};

/**
 * POST /auth/reset-password ⇒ void
 */
export const resetPassword = async (
  body: ResetPasswordPayload
): Promise<void> => {
  await api.post("/auth/reset-password", body);
};

export const getTokensByState = async (state: string): Promise<AuthResult> => {
  const { data } = await api.get<AuthResult>("/auth/tokens", {
    params: { state },
    headers: { disableAuth: true },
  });
  return data;
};