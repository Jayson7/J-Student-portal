// src/components/pages/RegisterButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterButton({ className = "btn btn-sm btn-outline-success" }) {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => navigate("/register")}>
      Register
    </button>
  );
}

export default RegisterButton;
