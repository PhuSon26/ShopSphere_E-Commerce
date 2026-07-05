import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleLogin = async () => {

  if (!data.email || !data.password) {
    alert("Please fill all fields");
    return;
  }

  try {

    setLoading(true);

    const res = await API.post(
  "/auth/login",
  data
);

localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "role",
  res.data.role
);

localStorage.setItem(
  "userName",
  res.data.name
);

localStorage.setItem(
  "userId",
  res.data.userId
);

navigate("/products");

  } catch (error) {

    console.log("Login Error:", error);

    alert("Invalid Email or Password");

  } finally {
    setLoading(false);
  }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(to right, #4facfe, #00f2fe)"
      }}
    >

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "15px"
        }}
      >

        <div className="text-center mb-4">

          <h2>🛒 ShopSphere</h2>

          <p className="text-muted">
            Login to continue shopping
          </p>

        </div>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={data.email}
          onChange={(e)=>
            setData({...data,email:e.target.value})
          }
        />

        <div className="input-group mb-3">

          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={data.password}
            onChange={(e)=>
              setData({...data,password:e.target.value})
            }
          />

          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="text-center mt-3">

          <small>
            Don't have an account?

            <a
              href="/register"
              className="ms-2 text-decoration-none"
            >
              Register
            </a>

          </small>

        </div>

      </div>

    </div>
  );
}

export default Login;