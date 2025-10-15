// src/components/Nav.jsx
import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import LoginButton from "./Algorithm/loginAuth";
import Register from "./pages/register";
import NotFound from "./pages/notFound";
import Logout from "./Algorithm/Logout";
import Login from "./pages/login";

function Nav() {
  // true  -> user has access token
  // false -> anonymous
  const isLoggedIn = useSelector((s) => Boolean(s.token.token));

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand text-capitalize text-success"
            style={{
              fontFamily: "Dancing Script",
              fontWeight: 700,
              fontSize: "35px",
            }}
            to="/"
          >
            J-LMS
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  All students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  All teachers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  My dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Contact
                </Link>
              </li>
            </ul>

            {/* RIGHT-SIDE BUTTONS */}
            <div className="d-flex gap-2">
              {isLoggedIn ? (
                <Logout>
                  {(onClick, loading) => (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={onClick}
                      disabled={loading}
                    >
                      {loading ? "Logging out…" : "Logout"}
                    </button>
                  )}
                </Logout>
              ) : (
                <LoginButton /> // reusable login component
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Nav;
