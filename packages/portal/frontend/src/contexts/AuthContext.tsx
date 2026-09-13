import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface AuthUser {
  _id: string;
  email: string;
  role?: string;
  plan?: string;
  isAdmin?: boolean;
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setCredentials: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
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

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  setCredentials: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedUser = localStorage.getItem("portal_user");
      const savedAuth = localStorage.getItem("portal_auth");
      if (savedUser && savedAuth) {
        const auth = JSON.parse(savedAuth);
        if (auth?.token && !isTokenExpired(auth.token)) {
          return JSON.parse(savedUser);
        }
      }
    } catch {}
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const savedAuth = localStorage.getItem("portal_auth");
      if (savedAuth) {
        const auth = JSON.parse(savedAuth);
        if (auth?.token && !isTokenExpired(auth.token)) {
          return auth.token;
        }
      }
    } catch {}
    return null;
  });

  const setCredentials = useCallback((payload: { user: AuthUser; token: string }) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem("portal_user", JSON.stringify(payload.user));
    localStorage.setItem("portal_auth", JSON.stringify({ token: payload.token }));
    localStorage.setItem("auth_token", payload.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("portal_user");
    localStorage.removeItem("portal_auth");
    localStorage.removeItem("auth_token");
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  const value = React.useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token && !isTokenExpired(token)),
    setCredentials,
    logout,
  }), [user, token, setCredentials, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
