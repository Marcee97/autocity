import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./ui/Home";
import { Login } from "./ui/Login";
import { Footer } from "../src/ui/Footer.jsx";
export const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}/>
     <Route path="/lavados" element={<Home/>}/>
    </Routes>
     <Footer/>
    </>
  );
};
