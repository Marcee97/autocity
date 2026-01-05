import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/axios.js";

export const Privadas = () => {
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 👇 CLAVE
    if (!token) {
      setAutorizado(false);
      return;
    }

    client.get("/verify")
      .then(() => setAutorizado(true))
      .catch(() => {
        localStorage.removeItem("token");
        setAutorizado(false);
      });
  }, []);

  if (autorizado === null) {
    return <p>Verificando sesión...</p>;
  }

  return autorizado ? <Outlet /> : <Navigate to="/" />;
};
