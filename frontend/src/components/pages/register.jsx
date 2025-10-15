// src/components/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ServiceApi from "../services/service"; // your axios instance

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      toast.warning("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await ServiceApi.post("/auth/register", form);
      toast.success("Account created! Redirecting…");
      setTimeout(() => navigate("/login"), 1500); // short delay so user sees toast
    } catch (err) {
      // backend field errors → show each one
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === "object") {
          Object.values(data).forEach((msg) => toast.error(msg));
        } else {
          toast.error(data.detail || "Registration failed");
        }
      } else {
        toast.error("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: 380 }}>
        <h3 className="text-center mb-3">Create account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
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
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Repeat password"
              value={form.password2}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating…" : "Register"}
          </button>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>

      {/* ONE container for the whole app is enough; put it in App.jsx if you prefer */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Register;
