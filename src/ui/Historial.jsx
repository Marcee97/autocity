import axios from "axios";
import "../styles/historial.css";
import { useEffect, useState } from "react";
import client from "../api/axios.js";
import React from "react";

export const Historial = ({ autoLavado }) => {

  const [historial, setHistorial] = useState([])

const [animarPrimerItem, setAnimarPrimerItem] = useState(false);


  useEffect(() =>{

const fetchLavados = async () => {

  try{
  
    //https://autocityback-production.up.railway.app
    const response = await client.get("/lavados")
   
console.log(response.data, "aca estan los lavados")
    setHistorial([...response.data].reverse());
response.json(response.data);

  }catch(error) {
    console.log(error, "aca esta elerror")
  }
}
fetchLavados()
  },[autoLavado])


  return (
   <section className="historial">
    <div className="cont-historial">
      <h2>Historial de Lavados</h2>
      <article className="historial-cont-lista">
        
        {historial.length > 0 ? (
          <div className="historial-lista">
            {historial.map((lav, index) => (
              <React.Fragment key={index}>
               <span>{lav.fecha}</span>
              <div className="fila-animation">
                <span>{lav.marca}</span>
                <span>{lav.vin}</span>
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
