import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}
