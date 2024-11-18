import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userItemType } from "../../type/user";
import { useGetUsers } from "../../hook/useUsers";
import { authDuration } from "../../shared/constants";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { data: userList } = useGetUsers();

  const onLogin = () => {
    const foundUser = userList?.items.find(({ fields }: userItemType) => {
      const { email, password } = fields;

      return (
        email["ko-KR"] === userData.email &&
        password["ko-KR"] === userData.password
      );
    });

    if (foundUser) {
      const currentTiem = new Date().getTime();
      const authData = JSON.stringify({
        expireAt: currentTiem + authDuration,
        id: foundUser.sys.id,
      });
      localStorage.setItem("userAuthInfo", authData);
      navigate("/todolist"); // [질문] /todolis 경로 하드코딩 말고 방법이 있는지?
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
