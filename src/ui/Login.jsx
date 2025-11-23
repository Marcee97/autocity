import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Menu } from "./Menu";
export const Login = () => {

    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate("/lavados")
    }
  return (
    <div className="componente-login">
        <Menu/>
    <div className="login">
      <div className="cont-login">
        <h3 className="titulo-login">Login</h3>
        <article className="cont-input-login">
          <input
            type="text"
            id="usuario"
            className="input-login"
            placeholder="Usuario"
            />

          <input
            type="password"
            id="contraseña"
            className="input-login"
            placeholder="Contraseña"
            />
          <div className="cont-btn-login">
            <button className="btn-login" onClick={navigateLogin}>Log In</button>
          </div>
        </article>
      </div>
    </div>
            </div>
  );
};
