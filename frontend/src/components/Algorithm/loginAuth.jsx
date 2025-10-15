// src/components/pages/LoginButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginButton({ className = "btn btn-sm btn-outline-primary" }) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate("/login")}>
      Login
    </button>
  );
}

export default LoginButton;
