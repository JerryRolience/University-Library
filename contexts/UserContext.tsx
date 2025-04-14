"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { AllUser, UserContextType } from "@/types";
import { fetchRequest } from "@/lib/api";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<AllUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    setLoadingUsers(true);
    setErrorUsers(null);

    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/user/get-users`,
        "GET",
        undefined,
        token
      );

      if (response.ok) {
        setUsers(response.data.users || []);
      } else {
        setErrorUsers(response.data?.message || "Failed to load users");
      }
    } catch (error) {
      setErrorUsers("An unexpected error occurred");
      console.error("Failed to fetch users:", error);
    } finally {
      setLoadingUsers(false);
    }
  }, [token]);

  const sortByName = () => {
    const sorted = [...users].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setUsers(sorted);
    setSortAsc(!sortAsc);
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [fetchUsers, token]);

  return (
    <UserContext.Provider
      value={{
        users,
        loadingUsers,
        errorUsers,
        fetchUsers,
        sortAsc,
        sortByName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
