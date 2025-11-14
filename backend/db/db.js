import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user:"root",
    database: "autocity",
    password:"redondos86",
    port: 3306,
})