// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css"; // Importa el módulo CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token, { path: "/" });
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      console.error("Error de login:", error);
      alert("Fallo al iniciar sesión, verifica tus credenciales.");
    }
  };

  return (
    <div className={styles.container}> {/* Usa el estilo del módulo CSS */}
      <div className={styles.logoContainer}>
        <img src="../public/images/logo-jre.png" alt="Logo" />
      </div>
      <div className={styles.formContainer}>
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Introduce tu nombre"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className={`${styles.button} ${styles.input}`} // Puedes combinar estilos
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;


