import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthTitle } from "./AuthTitle";
import { useLogin } from "../../services/requests/login";
import { useAuthContext } from "../../context/auth/AuthContext";
export function AuthContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const {
    login: triggerContextLogin,
    isAuthenticated,
    role,
  } = useAuthContext();
  const navigate = useNavigate();

  const { login, loading, error } = useLogin({
    username,
    password,
    setLoginData: triggerContextLogin,
  });

  const handleSubmit = async () => {
    await login();
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "admin" && loginAsAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, role, navigate, loginAsAdmin]);

  return (
    <AuthTitle
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={() => {
        setLoginAsAdmin(false);
        handleSubmit();
      }}
      isLoading={loading}
      error={error}
      onSubmitAdmin={() => {
        setLoginAsAdmin(true);
        handleSubmit();
      }}
    />
  );
}
