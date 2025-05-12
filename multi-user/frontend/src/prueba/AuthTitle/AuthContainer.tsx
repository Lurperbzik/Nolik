import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthTitle } from "./AuthTitle";
import { useLogin } from "../../services/requests/login";
import { useAuthContext } from "../../context/auth/AuthContext";

export function AuthContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuthenticated } = useAuthContext();

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
      navigate("/");
    }
  };

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
