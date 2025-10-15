import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Reducers/tokenReducer"; // path to your action

/**
 * Logout
 * Usage:
 *   <Logout>
 *     {(handleLogout, loading) => (
 *       <button onClick={handleLogout} disabled={loading}>
 *         {loading ? "Logging out…" : "Logout"}
 *       </button>
 *     )}
 *   </Logout>
 *
 *   – or –
 *
 *   <Logout>
 *     {(handleLogout) => <FiLogOut onClick={handleLogout} />}
 *   </Logout>
 */
function Logout({ children }) {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.token.loading);

  const handleLogout = () => dispatch(logout());

  // children must be a function: (onClick, loading) => <AnyJSX />
  return <>{children(handleLogout, loading)}</>;
}

Logout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Logout;
