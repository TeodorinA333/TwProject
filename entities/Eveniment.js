import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Eveniment = db.define("Eveniment", {
    EvenimentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EvenimentName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    EvenimentDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    GrupaEventsID:{
        type: Sequelize.INTEGER,
        allowNull: false
    }


})

export default Eveniment;
