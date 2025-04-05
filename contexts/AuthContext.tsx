"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchRequest } from "@/lib/api";
import { AuthContextType, DataBaseBooks, User } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<DataBaseBooks[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    setErrorBooks(null);
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/book/get-books`,
        "GET",
        undefined,
        token
      );

      if (response.ok) {
        setBooks(response.data || []);
      } else {
        setErrorBooks(response.data?.message || "Failed to load books");
      }
    } catch (error) {
      setErrorBooks("An unexpected error occurred");
      console.error("Failed to fetch books:", error);
    } finally {
      setLoadingBooks(false);
    }
  }, [token]);
  // Fetch books when token changes (user logs in)
  useEffect(() => {
    if (token) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, []);

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  };

  const setAuthCookie = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=${60 * 60}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
  };

  const clearAuthCookie = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken && storedRefreshToken) {
      try {
        if (isTokenExpired(storedToken)) {
          const refreshed = await refreshAuth();
          if (!refreshed) {
            clearAuth();
            return;
          }
        } else {
          const response = await fetchRequest(
            `${process.env.NEXT_PUBLIC_API}/api/auth/current-user`,
            "GET",
            undefined,
            storedToken
          );

          if (response.ok && response.data) {
            setUser(response.data);
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            setAuthCookie(storedToken);
          } else {
            clearAuth();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuth();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken || isTokenExpired(storedToken)) {
        const refreshed = await refreshAuth();
        if (!refreshed) {
          clearAuth();
          router.push("/sign-in?session=expired");
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [token, router]);

  const login = async (
    newToken: string,
    newRefreshToken: string,
    userData: User
  ) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setUser(userData);
    setAuthCookie(newToken);

    // Handle redirection after state is updated
    const redirect = searchParams?.get("redirect") || "/";
    await router.push(redirect);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    clearAuthCookie();
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshAuth = async (): Promise<boolean> => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) return false;

    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/user/refresh-token`,
        "POST",
        { refreshToken: storedRefreshToken }
      );

      if (response.ok && response.data.accessToken) {
        login(
          response.data.accessToken,
          response.data.refreshToken || storedRefreshToken,
          response.data.user
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetchRequest(
          `${process.env.NEXT_PUBLIC_API}/user/logout`,
          "GET",
          undefined,
          token
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      router.push("/sign-in");
    }
  };

  const value = {
    user,
    token,
    books,
    loadingBooks,
    errorBooks,
    fetchBooks,
    refreshToken,
    login,
    logout,
    refreshAuth,
    isAuthenticated: !!token && !isTokenExpired(token),
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
