import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { API_BASE_URL } from "../config/api.js"; // apna path adjust karo

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/hr/forgot-password`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ email })

    });

    const result = await res.json();

    alert(result.message);

  };

  return (

    <div className={styles.container}>

      <form className={styles.box} onSubmit={handleSubmit}>

        <h2 className={styles.title}>
          Forgot Password
        </h2>

        <input
          className={styles.input}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.button}>
          Send Reset Link
        </button>

      </form>

    </div>

  );
};

export default ForgotPassword;