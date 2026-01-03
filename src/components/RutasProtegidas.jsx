import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/axios.js";

export const RutasProtegidas = () => {
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    client.get("/verify", {
      withCredentials: true
    })
    .then(() => setAutorizado(true))
    .catch(() => setAutorizado(false));
  }, []);

  if (autorizado === null) {
    return <p>Verificando sesión...</p>;
  }

  return autorizado ? <Outlet /> : <Navigate to="/" />;
};


//  const response = await client.post("/home", {