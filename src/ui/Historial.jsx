import axios from "axios";
import "../styles/historial.css";
import { useEffect, useState } from "react";

export const Historial = ({ autoLavado }) => {

  const [historial, setHistorial] = useState(0)
  useEffect(() =>{

const fetchLavados = async () => {
  try{
    const response = await axios.get("https://autocityback-production.up.railway.app/lavados")
    console.log(response.data)
    setHistorial(response.data) 
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
         {historial ? (
  <ul className="historial-lista">{historial.map((lav, index) => (
    <li key={index}><span>{lav.marca}</span> <span>{lav.vin}</span> <span>{lav.ubicacion}</span> <span>{lav.tiempo}</span> </li>
  ))}</ul>
) : (
  <p>No hay lavados realizados</p>
)}
        </article>
      </div>
    </section>
  );
};
