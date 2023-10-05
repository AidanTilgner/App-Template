import React from "react";
import { useUser } from "../../Contexts/User";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import styles from "./index.module.scss";

function index() {
  const {
    isLoggedIn,
    user: { role },
  } = useUser();
  const isAdmin = role.includes("admin");

  return (
    <div className={styles.home}>
      {isLoggedIn ? (
        <p>Looks like you're logged in!</p>
      ) : (
        <p>
          Looks like you're not logged in. <Link to="/login">Login</Link> or{" "}
          <Link to="/signup">Signup</Link>.
        </p>
      )}
      {isLoggedIn && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      )}
      <br />
      <br />
      {isAdmin && (
        <Link to="/admin/users">
          <button className="btn btn-secondary">Admin Users</button>
        </Link>
      )}
    </div>
  );
}

export default index;
