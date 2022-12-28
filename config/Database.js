import { Sequelize } from "sequelize";

const db = new Sequelize('elearning_system', 'root','',{
    host:'localhost',
    dialect:'mysql'
});

export default db;