import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authDuration } from "@/shared/constants";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserAuthInfo {
  expireAt: number,
  id: string
}

let initialValue: UserAuthInfo | null = null

try {
  // TODO: 여기 초기값 만들 때. expireAt 검사 필요
  initialValue = JSON.parse(localStorage.getItem("userAuthInfo") ?? 'null');
} catch { /* empty */ }

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>({
  userId: initialValue?.id ?? null,
  isAuthenticated: !!initialValue,
  setAuth: () => { },
  logout: () => { }
});

// context api 생성
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialValue);
  const [userId, setUserId] = useState<null | string>(initialValue?.id ?? null);
  const [expireAt, setExpireAt] = useState<null | number>(initialValue?.expireAt ?? null)

  const navigate = useNavigate()

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('userAuthInfo');
      navigate('/')
    }

    let timerId = 0
    const now = Date.now();

    if (typeof expireAt === 'number' && expireAt > now) {
      timerId = setTimeout(logout, expireAt - now)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [expireAt, navigate])


  /**
   * LOGIN METHOD
   */
  const setAuth = (userId: string) => {
    setIsAuthenticated(true);
    setUserId(userId);

    const expireAt = Date.now() + authDuration;

    setExpireAt(expireAt);

    localStorage.setItem('userAuthInfo', JSON.stringify({ id: userId, expireAt }));
  }


  /**
   * LOGOUT METHOD
   */
  const logout = () => {
    // TODO: logout 구현
  }

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// context api 사용
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('need auth context')
  }

  return ctx
}

