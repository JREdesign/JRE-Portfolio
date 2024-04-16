import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate(); // Se usa para la redirección

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Intenta autenticar al usuario
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      // Si la autenticación es exitosa, guarda el token y otros datos necesarios
      setCookies("access_token", result.data.token, { path: "/" });
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);

      // Redirige al usuario a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error de login:", error);
      alert("Fallo al iniciar sesión, verifica tus credenciales.");
    }
  };

  return (
    <div className={styles.container}> {/* Usa estilos desde Login.module.css */}
      <div className={styles.logoContainer}>
        <img src="../public/images/logo-jre.png" alt="Logo" />
      </div>
      <div className={styles.formContainer}>
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Introduce tu nombre de usuario"
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
            className={`${styles.button} ${styles.input}`} // Combinación de estilos
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
