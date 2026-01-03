import { Route, Routes } from "react-router-dom";
import { Home } from "./ui/Home";
import { Login } from "./ui/Login";
import { Privadas } from "../src/components/Privadas";
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Privadas/>}>
        
          <Route path="/home" element={<Home />} />
        
        </Route>
      </Routes>
    </>
  );
};
