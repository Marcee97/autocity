import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./ui/Home";
import { Login } from "./ui/Login";
import { RutasProtegidas } from "./components/rutasProtegidas.jsx";
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<RutasProtegidas/>}>
        
          <Route path="/home" element={<Home />} />
        
        </Route>
      </Routes>
    </>
  );
};
