import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv"; 
import db from './config/instance.db.js';

// import routes here

dotenv.config(); 
const app = express();
const PORT =process.env.APP_PORT || 5000;

app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors()); 
 
app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:'auto'
    }
}))  


// install routes here

// connect to db instance
db.sequelize.sync()
.then(() =>app.listen(PORT,()=> console.log(`[+] Server running on port ${PORT}`)))
.catch(({message}) =>console.log(`[-] ${message}`));