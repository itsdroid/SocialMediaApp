import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from 'axios';

const Register =  () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleClick = async e => {
    e.preventDefault();
    setStatus(null);
    setErr(null);
    try {
      await axios.post("http://localhost:3000/api/auth/register", inputs);
      console.log("registered");
      setStatus("✅ Registered successfully!");
    }
 catch (error) {
      console.error("❌ Registration error:", error);

      // ✅ Show backend message if available
      if (error.response && error.response.data) {
        setErr(error.response.data.message || error.response.data);
      } else {
        setErr("❌ Something went wrong. Please try again.");
      }
    }

  };

  console.log(inputs);


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />

            {status && <p className="success">{status}</p>}
            {err && <p className="error">{err}</p>}

            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
