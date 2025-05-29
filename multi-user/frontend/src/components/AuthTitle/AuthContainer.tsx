import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthTitle } from "./AuthTitle";
import { useLogin } from "../../services/requests/login";
import { useAuthContext } from "../../context/auth/AuthContext";

export function AuthContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuthenticated, isAuthenticated } = useAuthContext();

  const navigate = useNavigate();
  const { login, loading, error } = useLogin({
    username,
    password,
    setLoginData: (data) => {
      console.log("Login data:", data);
    },
  });

  const handleSubmit = async () => {
    const success = await login();
    if (success) {
      setAuthenticated();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AuthTitle
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      isLoading={loading}
      error={error}
    />
  );
}
