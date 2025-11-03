import { useContext } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { AuthContext } from '../../context/authContext.js';



 const Login = () => {
  const { login } = useContext(AuthContext);
    const handleLogin = () => {
      login();
    };
  
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={Login}>
            <input type="text" placeholder="Username" name="username"/>
            <input type="password" placeholder="Password" name="password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
 }
 
export default Login;
