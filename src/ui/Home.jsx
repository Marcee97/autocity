import { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import { SelectField } from "../components/SelectField";
import { Modal } from "./Modal";
import { Historial } from "./Historial";
import axios from "axios";

export const Home = () => {
  const [vin, setVin] = useState(0);
  const [marca, setMarca] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [autoLavado, setAutoLavado] = useState(null);
  const interValorRef = useRef(null);
  const inputVinRef = useRef(null);

  const marcas = ["Fiat", "Peugeot", "Renault", "Nissan", "Volkswagen", "BYD"];
  const ubicaciones = ["Vereda", "Batea", "Salon", "Ingreso"];

  const iniciarLavado = () => {
    if (vin === 0 || marca === "" || ubicacion === "" || corriendo === true) {
      console.log(
        "Faltan datos del vehiculo",
        corriendo,
        vin,
        marca,
        ubicacion
      );
      return;
    } else {
      setCorriendo(true);
    }

    const inicio = Date.now() - tiempo * 1000;
    interValorRef.current = setInterval(() => {
      setTiempo(((Date.now() - inicio) / 1000).toFixed(1));
    }, 100);

    console.log(
      "el vin es",
      vin,
      "la marca es",
      marca,
      "y la ubicacion es",
      ubicacion
    );
  };

  const openModal = () => {
    setOnModal(true);
  };
  const detenerLavado = async () => {
    if (corriendo) {
      inputVinRef.current.value = "";
      setMarca("");
      setUbicacion("");
      setOnModal(false);
      clearInterval(interValorRef.current);
      setTiempo(0);
      setCorriendo(false);
      setAutoLavado(
        `Terminado:${marca} (${vin}) ${ubicacion} ${formato(tiempo)}`
      );
      const tiempoFOrmateado = formato(tiempo);
      const response = await axios.post("http://localhost:3000/prueba", {
        marca,vin,ubicacion, tiempoFOrmateado
      });
    } else {
      console.log("el lavado sigue corriendo");
    }
  };
  const formato = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = Math.floor(segundos % 60);
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="home">
      <h1>Autocity</h1>
      <div className="cont-home">
        <input
          ref={inputVinRef}
          type="number"
          className="home-input-vn"
          onChange={(e) => setVin(e.target.value)}
        />
        <div className="home-select-field">
          <SelectField
            label="Ubicación"
            name="ubicacion"
            onChange={setUbicacion}
            options={ubicaciones}
          />
          <SelectField
            label="Marca"
            name="marcas"
            onChange={setMarca}
            options={marcas}
          />
        </div>

        <p>{formato(tiempo)}</p>

        {corriendo ? (
          <button className="buttons" onClick={openModal}>
            Finalizar Lavado
          </button>
        ) : (
          <button className="buttons" onClick={iniciarLavado}>
            Iniciar Lavado
          </button>
        )}
      </div>
      <Modal
        onModal={onModal}
        tiempo={tiempo}
        formato={formato}
        setCorriendo={setCorriendo}
        setOnModal={setOnModal}
        detenerLavado={detenerLavado}
      />
      <Historial autoLavado={autoLavado} />
    </section>
  );
};
