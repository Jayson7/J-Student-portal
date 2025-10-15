// src/components/pages/Logout.jsx
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../Reducers/tokenReducer"; // adjust path

function Logout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((s) => s.token.loading);

  const handleLogout = async () => {
    await dispatch(logout()); // wait for Redux + purge
    toast.success("Logout successful");
    navigate("/login"); // redirect after toast
  };

  return <>{children(handleLogout, loading)}</>;
}

Logout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Logout;
