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
};
// code from https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx

// Navigate state : 라우트 간 데이터를 전달하기 위해 사용, 현재의 위치를 담아 보냄
// 리다이렉트 되기 전 위치 정보를 저장하여 -> 로그인 성공되면 -> 다시 원래 가려던 페이지로 바로 보내기 위해
