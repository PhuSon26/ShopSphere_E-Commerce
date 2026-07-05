import { useState } from "react";
import API from "../services/api";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER"
  });

  const register = async () => {

    if(user.password !== user.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try {

      await API.post("/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      });

      alert("Registration Successful");

      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER"
      });

    } catch(error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(to right, #667eea, #764ba2)"
      }}
    >

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "15px"
        }}
      >

        <div className="text-center mb-3">
          <h2>🛒 ShopSphere</h2>
          <p className="text-muted">
            Create your account
          </p>
        </div>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={user.name}
          onChange={(e)=>
            setUser({...user,name:e.target.value})
          }
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={user.email}
          onChange={(e)=>
            setUser({...user,email:e.target.value})
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={user.password}
          onChange={(e)=>
            setUser({...user,password:e.target.value})
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={(e)=>
            setUser({...user,confirmPassword:e.target.value})
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={register}
        >
          Register
        </button>

        <div className="text-center mt-3">

          <small>
            Already have an account?
            <a
              href="/login"
              className="ms-2 text-decoration-none"
            >
              Login
            </a>
          </small>

        </div>

      </div>

    </div>
  );
}

export default Register;