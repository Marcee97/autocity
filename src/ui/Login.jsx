import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import client from "../api/axios.js";
export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [registroIngreso, setRegeistroIngreso] = useState(true);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (registroIngreso === true) {
      console.log("es true estas en login");
    } else {
      console.log("es False esta en registro");
    }
  }, [registroIngreso]);
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/lavados");
  };

  const ingresoUsuario = async () => {
    try {
      const response = await client.post("/ingreso", {
        usuario,
        password,
      });

      console.log(response);

       if(response.status === 200){
        navigate("/home")
       }

      console.log(response.status, "estado en el front");
    } catch (error) {

      console.log(error)
      const zodErrors = error.response.data.errors;

      const agrupar = zodErrors.reduce((acc, err) => {
        acc[err.field] = err.message;
        return acc;
      }, {});
      setErrors(agrupar);
    }
  };
  const registroUsuario = async () => {
    try {
      await client.post("/registro", {
        usuario,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="componente-login">
      <Menu />
      <div className="login">
        <div className="cont-login">
          <h3 className="titulo-login">
            {registroIngreso ? "Login" : "Registro"}
          </h3>
          <article className="cont-input-login">
            <input
              type="text"
              id="usuario"
              className="input-login"
              placeholder={registroIngreso ? "Usuario" : "Crea un usuario"}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {errors.usuario && <p  style={{color: "red"}}>{errors.usuario}</p>}

            <input
              type="password"
              id="contraseña"
              className="input-login"
              placeholder={
                registroIngreso ? "Contraseña" : "Crea una contraseña"
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
            <div className="cont-btn-login">
              <button
                className="btn-login"
                onClick={registroIngreso ? ingresoUsuario : registroUsuario}
              >
                Log In
              </button>
            </div>
            <p onClick={() => setRegeistroIngreso((prev) => !prev)}>
              {registroIngreso ? "Registrarme" : "Volver al Login"}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};
