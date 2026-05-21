import { createContext, useContext, useEffect, useState } from "react";

type User = {
  username: string;
  profile: string;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  expiresIn: number | null;
  authenticated: boolean;
  loading: boolean;
  signIn: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedExpiresAt = localStorage.getItem("expiresAt");

    if (storedUser && storedAccessToken && storedExpiresAt) {
      const isExpired = Date.now() > Number(storedExpiresAt);

      if (isExpired) {
        logout();
        return;
      }

      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setExpiresIn(Number(storedExpiresAt));
    }
    setLoading(false);
  }, []);

  function signIn(data: any) {
    const { user, accessToken, expiresIn } = data;

    const expiresAt = Date.now() + expiresIn * 1000;

    setUser(user);
    setAccessToken(accessToken);
    setExpiresIn(expiresAt);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresAt", expiresAt.toString());
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    setExpiresIn(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: accessToken,
        expiresIn: expiresIn,
        authenticated: !!accessToken,
        loading,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
