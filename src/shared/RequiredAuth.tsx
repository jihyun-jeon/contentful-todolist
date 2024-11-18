import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../pages/auth/AuthGuard";
import { PropsWithChildren } from "react";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

// code from https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
