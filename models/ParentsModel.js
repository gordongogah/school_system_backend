import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Students from "./StudentModel.js";

const {DataTypes} = Sequelize;

const Parents = db.define('parent',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len :[3,100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    studentId:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }, 
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName:true
});

User.hasMany(Parents);
Students.hasMany(Parents)
Parents.belongsTo(User,{foreignKey:"userId"});
Parents.belongsTo(Parents,{foreignKey:'studentId'});
export default Parents;