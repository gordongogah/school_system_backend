import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Parents from "./ParentsModel.js";

const {DataTypes} = Sequelize;

const Students = db.define('student',{
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
    regno:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    parentId:{
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
    class:{
        type: DataTypes.INTEGER,
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

User.hasMany(Students);
Parents.hasMany(Students)
Students.belongsTo(User,{foreignKey:"userId"});
Students.belongsTo(Parents,{foreignKey:'parentId'});
export default Students;