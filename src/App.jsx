import { Route, Routes } from "react-router-dom";
import { Home } from "./ui/Home";
import { Login } from "./ui/Login";
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};
