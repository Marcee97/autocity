import "../styles/historial.css";
import { useEffect, useState } from "react";
import client from "../api/axios.js";
import React from "react";

export const Historial = ({ autoLavado }) => {
  const [historial, setHistorial] = useState([]);

  const [animarPrimerItem, setAnimarPrimerItem] = useState(false);

  useEffect(() => {
    const fetchLavados = async () => {
      try {
        const response = await client.get("/lavados");
console.log(response.data, "respuesta del historial");
        setHistorial([...response.data].reverse());
      } catch (error) {
        console.log(error, "aca esta elerror");
      }
    };
    fetchLavados();
  }, [autoLavado]);

  return (
    <section className="historial">
      <div className="cont-historial">
        <h2>Historial de Lavados</h2>
        <article className="historial-cont-lista">
          {historial.length > 0 ? (
            <div className="historial-lista">
              {historial.map((lav, index) => (
                <React.Fragment key={index}>
                  <div className="cont-fecha-hora">
                    <span>{lav.hora}</span>
                    <span>{lav.fecha}</span>
                  </div>
                  <div className="fila-animation">
                    <div>
                    <span>{lav.marca}</span>
                    {" "}
                    <span>{lav.modelo}</span>
                    </div>
                    <span>({lav.vin})</span>
                    <span>{lav.ubicacion}</span>
                    <span>{lav.tiempo}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p> Todavía no lavaste NADA </p>
          )}
        </article>
      </div>
    </section>
  );
};
