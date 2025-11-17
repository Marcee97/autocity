import axios from "axios";
import "../styles/historial.css";
import { useEffect, useState } from "react";

export const Historial = ({ autoLavado }) => {

  const [historial, setHistorial] = useState([])

const [animarPrimerItem, setAnimarPrimerItem] = useState(false);


  useEffect(() =>{

const fetchLavados = async () => {

  try{
  
    //https://autocityback-production.up.railway.app
    const response = await axios.get("https://autocityback-production.up.railway.app/lavados")
    console.log(response.data)
    
   
    setHistorial([...response.data].reverse());


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
  <ul className="historial-lista">{historial.map((lav, index) => ( <li key={index}><span>{lav.marca}</span> <span>{lav.vin}</span> <span>{lav.ubicacion}</span> <span>{lav.tiempo}</span> </li> ))}</ul>
) : (
  <p>Todavia no lavaste NADA</p>
)}
        </article>
      </div>
    </section>
  );
};
