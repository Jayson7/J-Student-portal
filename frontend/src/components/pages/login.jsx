// src/pages/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // v6
import { useDispatch, useSelector } from "react-redux";
import { fetchToken } from "../Reducers/tokenReducer"; // adjust path

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // read Redux state
  const {
    token,
    loading,
    error: storeError,
  } = useSelector((state) => state.token);

  // local form state only for inputs
  const [form, setForm] = useState({ username: "", password: "" });

  // when token appears, go home
  const hasToken = Boolean(token);

  useEffect(() => {
    if (hasToken) {
      navigate("/");
    }
  }, [hasToken, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchToken(form)); // credentials -> Redux
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: 350 }}>
        <h3 className="text-center mb-3 mt-4 " style={{ fontSize: 35 }}>
          Welcome Back
        </h3>
        <h6 className="text-center fw-light mb-4 text-muted">
          {" "}
          Sign In Access your account
        </h6>
        {storeError && <div className="alert alert-danger">{storeError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="mx-1">
                Remember me
              </label>
            </div>
            <Link to="/forgot">Forgot password?</Link>
          </div>
        </form>

        <div className="text-center mt-4 text-muted mb-2">
          — or continue with —
        </div>
        <div className="d-flex justify-content-center gap-3 mt-2">
          <i className="fa fa-github" aria-hidden="true" />
          <i className="fa fa-google" aria-hidden="true" />
          <i className="fa fa-facebook" aria-hidden="true" />
          <i className="fa fa-twitter" aria-hidden="true" />
        </div>

        <div className="text-center mt-3 my-4">
          Don’t have an account? <Link to={"register"}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
