import sequelize from "./Database.js"; 

'use strict'; 

// initialize models before appending to the models object

const models ={}; 

const db ={sequelize, models};

export default db;