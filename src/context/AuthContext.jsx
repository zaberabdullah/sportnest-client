"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();

  const user = session?.user ?? null;

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isPending, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}