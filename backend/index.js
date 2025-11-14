import express from "express";
import router from "./routes/routes.routes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);


app.listen(3000, () => {
  console.log("Servidor corriendo 3000");
});
