import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {

  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  useEffect(() => {

    loadCartCount();

    const interval = setInterval(() => {
      loadCartCount();
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const loadCartCount = async () => {
    try {

     const userId =
  localStorage.getItem("userId");

const res =
  await API.get(`/cart/${userId}`);

      let count = 0;

      res.data.forEach(item => {
        count += item.quantity;
      });

      setCartCount(count);

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");

  navigate("/login");
};

  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim() === "") {
      navigate("/products");
    } else {
      navigate(`/products?search=${search}`);
    }
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/products"
        >
          🛒 ShopSphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          {/* Search */}

          <form
            className="d-flex mx-auto w-50"
            onSubmit={handleSearch}
          >

            <input
              className="form-control"
              type="search"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary ms-2"
            >
              Search
            </button>

          </form>

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item position-relative">

              <Link className="nav-link" to="/cart">
                🛒 Cart
              </Link>

              {cartCount > 0 && (
                <span
                  className="
                  position-absolute
                  top-0
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-danger
                "
                >
                  {cartCount}
                </span>
              )}

            </li>

            {role === "ADMIN" && (

              <li className="nav-item">

                <Link
                  className="nav-link text-warning fw-bold"
                  to="/admin"
                >
                  Admin Dashboard
                </Link>

              </li>

            )}

            {token ? (

              <>
                <li className="nav-item">

                  <span className="nav-link text-info">
                    👋 {userName}
                  </span>

                </li>

                <li className="nav-item">

                  <button
                    className="btn btn-danger ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>

                </li>
              </>

            ) : (

              <>
                <li className="nav-item">

                  <Link
                    className="btn btn-outline-light me-2"
                    to="/login"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="btn btn-success"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>
              </>

            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;