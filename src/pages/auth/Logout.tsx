import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("userAuthInfo"); // context Api [TODO]
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
};

export default Logout;
