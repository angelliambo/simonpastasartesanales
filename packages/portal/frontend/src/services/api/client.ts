import { API_BASE_URL } from "../../config/environment";

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Obtener token JWT de localStorage
  let token: string | null = null;
  try {
    token = localStorage.getItem("auth_token");
    if (!token) {
      const savedAuth = localStorage.getItem("portal_auth");
      if (savedAuth) {
        token = JSON.parse(savedAuth).token || null;
      }
    }
  } catch {}

  if (token && token !== "cookie-based" && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const response = await fetch(url, config);

  let data: any;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error: ApiError = {
      message:
        (typeof data === "object" && data?.message) ||
        (typeof data === "string" && data) ||
        `HTTP Error ${response.status}`,
      status: response.status,
      data,
    };
    throw error;
  }

  return data as T;
}

export default apiClient;
