import React from "react";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/assets/branding/logo.svg" alt="LoreLens logo." />
      </div>
    </div>
  );
}

export default Navbar;
