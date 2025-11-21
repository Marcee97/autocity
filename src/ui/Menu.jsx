import axios from "axios";
import "../styles/menu.css";
import { useEffect, useState } from "react";
import client from "../api/axios.js";
export const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [promedio, setPromedio] = useState("00.00.00");
  useEffect(() => {
    const fetchTiempoLavado = async () => {
      try {
        const response = await client.get("/lavados");
        const tiempos = response.data.map((lav) => lav.tiempo);
        console.log(tiempos, "tiempos");

        const prom = calcularPromedio(tiempos);

        setPromedio(prom);
      } catch (error) {
        console.log(error, "error en menu");
      }
    };
    fetchTiempoLavado();
  }, [menuOpen]);

  const calcularPromedio = (tiempos) => {
    // Convertir todos a segundos
    const totalSegundos = tiempos.reduce((acc, tiempo) => {
      const [h, m, s] = tiempo.split(":").map(Number);
      return acc + h * 3600 + m * 60 + s;
    }, 0);

    // Calcular promedio
    const promedio = Math.floor(totalSegundos / tiempos.length);

    // Convertir de vuelta a HH.MM.SS
    const horas = String(Math.floor(promedio / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((promedio % 3600) / 60)).padStart(2, "0");
    const segundos = String(promedio % 60).padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
  };
  return (
    <section className="menu">
      <nav className="cont-menu-buttons">
        <h1>Autocity</h1>
        <span
          className="material-symbols-outlined icon-open-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          menu
        </span>
      </nav>

      <div
        className={
          menuOpen ? "cont-menu-desplegable active" : "cont-menu-desplegable"
        }
      >
        <span
          className="material-symbols-outlined icon-close-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          close
        </span>
        <div className="options-menu-desplegable">
          <p>Tiempo promedio de lavado</p>
          <p className="li-option">{promedio}</p>
        </div>
      </div>
    </section>
  );
};
