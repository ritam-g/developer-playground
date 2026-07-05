/**
 * ProtectedRoute
 *
 * Why this exists:
 * React Router v6 doesn't have a built-in "private route" concept.
 * This component wraps any route and redirects unauthenticated users to /login.
 * It also shows a "replace" redirect — so pressing Back after login doesn't 
 * send the user back to the login page.
 */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // replace: true prevents the login page from appearing in browser history
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the nested child route component
  return <Outlet />;
}
