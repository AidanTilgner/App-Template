import React from "react";
import "./Global.scss";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from "./pages/Home";
import Users from "./pages/Admin/Users";
import { useUser } from "./Contexts/User";

function App() {
  const { user } = useUser();

  const is_admin = ["superadmin", "admin"].includes(user?.role || "");

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          {is_admin && (
            <Route path="admin">
              <Route path="users" element={<Users />} />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
