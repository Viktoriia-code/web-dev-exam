import useField from "../hooks/useField";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { register, error } = useRegister("/api/users");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await register({ email: email.value, password: password.value }, "login");
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };


  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
