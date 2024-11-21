import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authDuration } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserAuthInfo {
  id: string;
  expireAt: number;
}

let initialValue: UserAuthInfo | null = null;

try {
  // [TODO] : 여기 초기값 만들 때. expireAt 검사 필요
  initialValue = JSON.parse(localStorage.getItem("userAuthInfo") ?? '"null"');
} catch {
  //
}

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>({
  userId: initialValue?.id ?? null,
  isAuthenticated: !!initialValue,
  setAuth: () => {},
  logout: () => {},
});

// context api 생성
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialValue);
  const [userId, setUserId] = useState<null | string>(initialValue?.id ?? null);
  const [expireAt, setExpireAt] = useState<null | number>(
    initialValue?.expireAt ?? null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("userAuthInfo");
      navigate("/");
    };

    const now = Date.now();
    let timerId = 0;

    if (typeof expireAt === "number" && expireAt > now) {
      timerId = setTimeout(logout, expireAt - now);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [expireAt, navigate]);

  /**
   * LOGIN METHOD
   */
  const setAuth = (userId: string) => {
    setIsAuthenticated(true); // 1. 인증 성공 처리
    setUserId(userId); // 2. 아이디 저장
    const expireAt = Date.now() + authDuration;
    setExpireAt(expireAt); // 3. expireAt 설정

    localStorage.setItem(
      "userAuthInfo",
      JSON.stringify({ id: userId, expireAt })
    );
  };

  /**
   * LOGOUT
   */
  const logout = () => {
    // TODO: logout 구현
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// context api 사용
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("need auth context");
  }

  return ctx;
};
