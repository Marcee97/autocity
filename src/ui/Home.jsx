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
  const [modelo, setModelo] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [autoLavado, setAutoLavado] = useState(false);
  const interValorRef = useRef(null);
  const inputVinRef = useRef(null);
  const marcas = [
    { label: "Fiat", value: "fiat" },
    { label: "Peugeot", value: "peugeot" },
    { label: "Renault", value: "renault" },
    { label: "Jeep", value: "jeep" },
    { label: "Nissan", value: "nissan" },
    { label: "Volkswagen", value: "vw" },
    { label: "BYD", value: "byd" },
    { label: "MG", value: "mg" },
    { label: "Chery", value: "chery" },
    { label: "Jetour", value: "jetour" },
    {label: "Otro", value: "otro"}
  ];

  const modelosPorMarca = {
    fiat: [
      { label: "Cronos", value: "cronos" },
      { label: "Argo", value: "argo" },
      { label: "Mobi", value: "mobi" },
      {label: "Fastback", value: "fastback" },
      {label: "Titano", value: "titano" },
      { label: "Pulse", value: "pulse" },
      { label: "Toro", value: "toro" },
      { label: "Strada", value: "strada" },
      { label: "600", value: "600" },
      {label: "Otro", value: "otro"}
    ],
    peugeot: [
      { label: "208", value: "208" },
      { label: "2008", value: "2008" },
      { label: "3008", value: "3008" },
      { label: "408", value: "408" },
      { label: "Partner", value: "partner" },
      { label: "Expert", value: "expert" },
      { label: "Boxer", value: "boxer" },
      {label: "Otro", value: "otro"}
    ],
    vw: [
      { label: "Polo", value: "polo" },
      { label: "Polo Track", value: "polo_track" },
      { label: "Tera", value: "tera" },
      { label: "Amarok", value: "amarok" },
      {label: "Virtus", value: "virtus" },
      { label: "T-Cross", value: "t_cross" },
      { label: "Nivus", value: "nivus" },
      { label: "Taos", value: "taos" },
      {label: "Otro", value: "otro"}
    ],
    renault: [
      { label: "Kwid", value: "kwid" },
      { label: "Duster", value: "duster" },
      { label: "Stepway", value: "stepway" },
      { label: "Sandero", value: "sandero" },
      { label: "Logan", value: "logan" },
      { label: "Koleos", value: "koleos" },
      { label: "Kardian", value: "kardian"},
      {label: "Otro", value: "otro"}
    ],
    nissan: [
      { label: "Frontier", value: "frontier" },
      { label: "Kicks", value: "kicks" },
      { label: "X-Trail", value: "x_trail" },
      { label: "Versa", value: "versa" },
      { label: "Sentra", value: "sentra" },
      {label: "Otro", value: "otro"}
    ],
    jeep : [
      { label: "Renegade", value: "renegade" },
      { label: "Compass", value: "compass" },
      {label: "Commander", value: "commander" },
      { label: "Wrangler", value: "wrangler" },
      { label: "Cherokee", value: "cherokee" },
      {label: "Otro", value: "otro"}

    ],
    byd: [
      {label: "Yuan Pro", value: "yuan_pro" },
      {label: "Song Pro", value: "song_pro"},
      {label: "Dolphin Mini", value: "dolphin_mini"},
      {label: "Otro", value: "otro"}
    ],
    mg: [
      {label: "Hybrid 3", value: "hybrid_3"},
      {label: "Hybrid ZS", value: "zs"},
      {label: "Otro", value: "otro"},
    ],
    chery: [
      {label: "Tiggo 7 Pro", value: "tiggo_7_pro"},
      {label: "Otro", value: "otro"}
    ],
    jetour: [
      {label: "Dashing", value: "dashing"}
    ]
  };
  const ubicaciones = [
    { label: "Vereda", value: "vereda" },
    { label: "Batea", value: "batea" },
    { label: "Test Drive", value: "test_drive" },
    { label: "Evento", value: "evento" },
    { label: "Salón", value: "salon" },
    { label: "Alistado", value: "alistado" },
    { label: "Entrega", value: "entrega" },
    { label: "Otro", value: "otro" },
  ];

  const iniciarLavado = () => {
    if (
      vin === 0 ||
      marca === "" ||
      ubicacion === "" ||
      corriendo ||
      modelo === ""
    )
      return;

    const inicioLavado = Date.now();
    localStorage.setItem("inicioLavado", inicioLavado);
    localStorage.setItem("modelo", modelo);
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
      setModelo(localStorage.getItem("modelo") || "");
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
        modelo,
        tiempoFOrmateado: tiempoFormateado,
      });

      // 🔥 LIMPIAR LOCALSTORAGE
      localStorage.removeItem("inicioLavado");
      localStorage.removeItem("marca");
      localStorage.removeItem("ubicacion");
      localStorage.removeItem("modelo");
      localStorage.removeItem("vin");

      // 🔄 RESET ESTADO
      setTiempo(0);
      setCorriendo(false);
      setOnModal(false);
      setMarca("");
      setUbicacion("");
      setModelo("");
      setVin("");

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
        <SelectField
          label="Modelo"
          name="modelo"
          options={modelosPorMarca[marca] || []}
          onChange={setModelo}
          value={modelo}
          />
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
