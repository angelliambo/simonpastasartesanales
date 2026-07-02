import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  _id: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "6_meses" | "1_ano" | "god_mode" | "trial";
  isAdmin?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return true;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    if (exp && Date.now() >= exp * 1000) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
};

const loadInitialState = (): AuthState => {
  try {
    const savedUser = localStorage.getItem("zn-portal-user");
    const savedAuth = localStorage.getItem("zn-portal-auth");
    if (savedUser && savedAuth) {
      const user = JSON.parse(savedUser);
      const auth = JSON.parse(savedAuth);
      const token = auth.token || null;

      // If token is expired or missing, clear storage
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("zn-portal-user");
        localStorage.removeItem("zn-portal-auth");
        localStorage.removeItem("zn-portal-auth-last-checked");
        return {
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: null,
        };
      }

      // Validate userId against backend asynchronously, cached for 1 hour
      if (user._id) {
        const lastChecked = localStorage.getItem("zn-portal-auth-last-checked");
        const cacheExpiryMs = 60 * 60 * 1000; // 1 hour
        const shouldCheck =
          !lastChecked ||
          Date.now() - parseInt(lastChecked, 10) > cacheExpiryMs;

        if (shouldCheck) {
          fetch(`/api/auth/me?userId=${encodeURIComponent(user._id)}`)
            .then((r) => r.json())
            .then((data) => {
              if (data && data.success && data.exists === false) {
                localStorage.removeItem("zn-portal-user");
                localStorage.removeItem("zn-portal-auth");
                localStorage.removeItem("zn-portal-auth-last-checked");
                window.location.reload();
              } else if (data && data.success && data.exists === true) {
                localStorage.setItem(
                  "zn-portal-auth-last-checked",
                  Date.now().toString()
                );
              }
            })
            .catch(() => {});
        }
      }
      return {
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  } catch {
    localStorage.removeItem("zn-portal-user");
    localStorage.removeItem("zn-portal-auth");
    localStorage.removeItem("zn-portal-auth-last-checked");
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("zn-portal-user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "zn-portal-auth",
        JSON.stringify({ token: action.payload.token })
      );
      localStorage.setItem(
        "zn-portal-auth-last-checked",
        Date.now().toString()
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("zn-portal-user");
      localStorage.removeItem("zn-portal-auth");
      localStorage.removeItem("zn-portal-auth-last-checked");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState,
  },
});

export const { setCredentials, logout, setError, setLoading, clearError, reset } = authSlice.actions;
export default authSlice.reducer;
