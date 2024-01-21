import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const GrupaEvents = db.define("GrupaEvents", {
    GrupaEventsID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    GrupaEventsName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    GrupaEventsClosed: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default GrupaEvents;
