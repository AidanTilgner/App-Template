import React, { FormEventHandler } from "react";
import useFetch from "../Hooks/useFetch";
import { User } from "../declarations/main";
import styles from "./Authform.module.scss";
import { useUser } from "../Contexts/User";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { load: signup } = useFetch<
    {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    {
      accessToken: string;
      refreshToken: string;
      user: User;
    }
  >({
    url: "/users/signup",
    method: "POST",
    body: formData,
    dependencies: [formData],
  });

  const { loadUser } = useUser();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    signup()
      .then((res) => {
        console.log("Signup response", res);
        if (!res.data?.accessToken || !res.data?.refreshToken) {
          alert("SignUp failed");
          return;
        }
        localStorage.setItem("accessToken", res.data?.accessToken);
        localStorage.setItem("refreshToken", res.data?.refreshToken);
        loadUser();
      })
      .catch((err) => {
        console.log("SignUp error", err);
        alert("SignUp failed");
      });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__header}>
          <h1>Sign up</h1>
        </div>
        <div className={styles.form__body}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Your email..."
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Your password..."
            />
          </div>
          <div className="formGroup">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Your first name..."
            />
          </div>
          <div className="formGroup">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Your last name..."
            />
          </div>
        </div>
        <div className={styles.form__footer}>
          <div className="formButtons">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
          <p className="formResources">
            Have an account already? <Link to="/login">Login</Link> instead.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
