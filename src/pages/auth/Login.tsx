import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userItemType } from "../../type/user";
import { useGetUsers } from "../../hook/useUsers";
import { authDuration } from "../../shared/constants";
import { useAuth } from "./AuthGuard";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const users = useGetUsers();

  const from = location.state?.from?.pathname || "/todolist";

  const onLogin = () => {
    const foundUser = users.data?.items.find(({ fields }: userItemType) => {
      const { email, password } = fields;

      return (
        email["ko-KR"] === userData.email &&
        password["ko-KR"] === userData.password
      );
    });

    if (foundUser) {
      setAuth(foundUser.sys.id);
      navigate(from);
    }
  };

  return (
    <div>
      <label>
        이메일
        <input
          type="email"
          name="email"
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setUserData((prev) => ({ ...prev, [name]: value }));
          }}
        />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          name="password"
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setUserData((prev) => ({ ...prev, [name]: value }));
          }}
        />
      </label>
      <button type="submit" onClick={onLogin}>
        로그인
      </button>
    </div>
  );
}

export default Login;
