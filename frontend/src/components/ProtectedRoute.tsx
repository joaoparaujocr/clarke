import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/customers/login" />;
  }
  return children;
};