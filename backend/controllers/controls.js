import { pool } from "../db/db"


export const prueba = (req, res) => {
    console.log(req.body, "messias")
    res.send("Ruta de prueba funcionando")
    pool.query ("INSERT INTO lavados (marca, vin, ubicacion, tiempo) VALUES (?,?,?,?)",
    [req.body.marca, req.body.vin, req.body.ubicacion, req.body.tiempoFOrmateado])
}


export const getLavados = async(req, res) => {
    try {
       const [rows] = await pool.query("SELECT * FROM lavados")
       console.log(rows)
       res.json(rows)   
    } catch (error) {
        console.log(error)
    }
}