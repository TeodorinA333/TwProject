import mysql from "mysql2/promise";
import env from "dotenv";
import Eveniment from "./Eveniment.js";
import GrupaEvents from "./GrupaEvents.js";


env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database: 'Events'
    })
    .then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS Events')
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config(){
    GrupaEvents.hasMany(Eveniment, {as: "Evenimente", foreignKey: "GrupaEventsID"});
    Eveniment.belongsTo(GrupaEvents, {foreignKey: "GrupaEventsID"});
}

function DB_Init(){
    Create_DB();
    FK_Config();
}


export default DB_Init;