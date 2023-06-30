import React from "react";
import "./Global.scss";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />}>
          <Route index element={<p>Home</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
