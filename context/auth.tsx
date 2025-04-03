"use client";
import React from "react";
import { AuthResponse, LoginFormData, RegisterFormData } from "types/auth";
import { User } from "types/user";
import { config } from "config";
import { revalidate } from "utils/actions";

interface AuthContextProps {
  user: User | null;
  handleLogin: (formData: LoginFormData) => Promise<AuthResponse>;
  handleRegister: (formData: RegisterFormData) => Promise<AuthResponse>;
  handleLogout: () => Promise<AuthResponse>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = React.createContext({} as AuthContextProps);

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);

  const handleLogin = React.useCallback(
    async ({
      username,
      password,
      remember,
    }: LoginFormData): Promise<AuthResponse> => {
      try {
        const req = await fetch(`${config.apiUrl}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, remember }),
        });
        const { success, error } = await req.json();

        if (error) return { error };

        setUser({ username });
        revalidate("/");
        return { success };
      } catch (error) {
        return { error: JSON.stringify(error) };
      }
    },
    []
  );

  const handleRegister = React.useCallback(
    async ({
      username,
      password,
      terms,
    }: RegisterFormData): Promise<AuthResponse> => {
      try {
        const req = await fetch(`${config.apiUrl}/auth/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, terms }),
        });

        const { success, error } = await req.json();

        if (error) return { error };

        setUser({ username });
        revalidate("/");
        return { success };
      } catch (error) {
        return { error: JSON.stringify(error) };
      }
    },
    []
  );

  const handleLogout = React.useCallback(async (): Promise<AuthResponse> => {
    try {
      const req = await fetch(`${config.apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const { success, error } = await req.json();

      if (error) return { error };

      setUser(null);
      revalidate("/");
      return { success };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }, []);

  const authProviderValue = React.useMemo(
    () => ({
      user,
      handleLogin,
      handleRegister,
      handleLogout,
    }),
    [user, handleLogin, handleRegister, handleLogout]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
