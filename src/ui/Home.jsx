import { useState, useRef, useEffect } from "react";
import "../styles/home.css";
import { SelectField } from "../components/SelectField";
import { Modal } from "./Modal";
import { Historial } from "./Historial";
import client from "../api/axios.js";
import { Menu } from "./Menu.jsx";
import { Footer } from "./Footer.jsx";

export const Home = () => {
  const [vin, setVin] = useState("");
  const [marca, setMarca] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [autoLavado, setAutoLavado] = useState(false);
  const interValorRef = useRef(null);
  const inputVinRef = useRef(null);

  const marcas = [
    "Fiat",
    "Peugeot",
    "Renault",
    "Jeep",
    "Nissan",
    "Volkswagen",
    "BYD",
    "MG",
    "Chery",
    "Jetour"
  ];
  const ubicaciones = ["Vereda", "Batea","Test Drive","Evento", "Salon", "Alistado", "Entrega", "Otro"];

  const iniciarLavado = () => {
    if (vin === 0 || marca === "" || ubicacion === "" || corriendo) return;

    const inicioLavado = Date.now();
    localStorage.setItem("inicioLavado", inicioLavado);

    localStorage.setItem("marca", marca);
    localStorage.setItem("ubicacion", ubicacion);
    localStorage.setItem("vin", vin);

    setCorriendo(true);

    console.log("Inicio lavado:", inicioLavado);
  };

  useEffect(() => {
    if (!corriendo) return;

    const inicioLavado = Number(localStorage.getItem("inicioLavado"));
    if (!inicioLavado) return;

    interValorRef.current = setInterval(() => {
      const elapsed = (Date.now() - inicioLavado) / 1000;
      setTiempo(elapsed);
    }, 100);

    return () => clearInterval(interValorRef.current);
  }, [corriendo]);

  useEffect(() => {
    const inicioLavado = localStorage.getItem("inicioLavado");
    if (inicioLavado) {
      setCorriendo(true);
      setMarca(localStorage.getItem("marca") || "");
      setUbicacion(localStorage.getItem("ubicacion") || "");
      setVin(localStorage.getItem("vin") || "");
    }
  }, []);

  const openModal = () => {
    setOnModal(true);
  };

  const detenerLavado = async () => {
    if (!corriendo) return;

    clearInterval(interValorRef.current);

    const tiempoFormateado = formato(tiempo);

    try {
      await client.post("/home", {
        marca,
        vin,
        ubicacion,
        tiempoFOrmateado: tiempoFormateado,
      });

      // 🔥 LIMPIAR LOCALSTORAGE
      localStorage.removeItem("inicioLavado");
      localStorage.removeItem("marca");
      localStorage.removeItem("ubicacion");
      localStorage.removeItem("vin");

      // 🔄 RESET ESTADO
      setTiempo(0);
      setCorriendo(false);
      setOnModal(false);
      setMarca("");
      setUbicacion("");
      setVin(0);

      inputVinRef.current.value = "";

      setAutoLavado((prev) => !prev);

      console.log("Lavado finalizado y guardado");
    } catch (error) {
      console.error("Error al guardar lavado:", error);
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
      <Menu />
      <div className="cont-home">
        <input
          ref={inputVinRef}
          type="text"
          placeholder="Vin"
          className="home-input-vn"
          onChange={(e) => setVin(e.target.value)}
          value={vin}
        />
        <div className="home-select-field">
          <SelectField
            label="Ubicación"
            name="ubicacion"
            onChange={setUbicacion}
            options={ubicaciones}
            value={ubicacion}
          />
          <SelectField
            label="Marca"
            name="marcas"
            onChange={setMarca}
            options={marcas}
            value={marca}
          />
        </div>
        <div className="cont-tiempo">
          <h4 className="tiempo">{formato(tiempo)}</h4>
        </div>

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
      <Footer />
    </section>
  );
};
