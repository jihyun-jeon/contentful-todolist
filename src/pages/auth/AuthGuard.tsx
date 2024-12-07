import { createContext, ReactNode, useContext, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => void;
  userId: string | null;
}
const AuthContext = createContext<AuthContextType | null>(null);

// context api 생성
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<null | string>(null);

  const checkAuth = () => {
    const getInfo = JSON.parse(localStorage.getItem("userAuthInfo"));

    const expiredAt = getInfo?.expireAt;
    const userId = getInfo?.id;

    if (!expiredAt || !userId || expiredAt <= new Date().getTime()) {
      setIsAuthenticated(false);
      setUserId(null);
    } else {
      setIsAuthenticated(true);
      setUserId(userId);
    }
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// context api 사용
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
