import useField from "../hooks/useField";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const role = useField("text");

  const { register, error } = useRegister("/api/users");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await register({
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value
    }, "signup");

    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Role:</label>
        <input {...role} />
        <button>Sign up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
