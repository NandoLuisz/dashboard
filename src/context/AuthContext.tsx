import { createContext, useContext, useEffect, useState } from "react";

type User = {
  username: string;
  profile: string;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  expiresIn: number | null;
  signIn: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedExpiresIn = localStorage.getItem("expiresIn");

    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setExpiresIn(storedExpiresIn ? parseInt(storedExpiresIn) : null);
    }
  }, []);

  function signIn(data: any) {
    const { user, accessToken, expiresIn } = data;

    setUser(user);
    setAccessToken(accessToken);
    setExpiresIn(expiresIn);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresIn", expiresIn.toString());
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    setExpiresIn(null);
    setAccessToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: accessToken,
        expiresIn: expiresIn,
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
