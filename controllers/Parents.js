import Parents from "../models/ParentsModel.js" 
import User from "../models/UserModel.js";
import {Op} from "sequelize"
import argon2 from "argon2";

export const getStudent = async(req, res) =>{
    try {
        let response;
        if(req.role === 'admin'){
            response = await Students.findAll({
                attributes:['uuid','name','email','regno','parent','class'],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            })
        }else{
            response = await Students.findAll({
                attributes:['uuid','name','email','regno','parent','class'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            })
        }
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getStudentById = async(req, res) =>{
    try {
        const student = await Students.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!student) return res.status(404).json({msg:'gggg'});
        let response;
        if (req.role === 'admin'){
            response = await Students.findOne({
                attributes:['uuid','name','email','regno','parent','class'],
                where:{
                    id: student.id
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            })
        }else{
            response = await Students.findOne({
                attributes:['uuid','name','email','regno','parent','class'],
                where:{
                [Op.and]:[{id:student.id},{userId:req.userId}]
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createStudent = async(req, res) =>{
    const {name, email,regno,parent,s_class, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await Students.create({
            name: name,
            email: email,
            regno: regno,
            parent:parent,
            s_class:s_class,
            password: hashPassword,
            userId: req.userId
        
        });
        res.status(201).json({msg: "Student created succesful"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateStudent = async(req, res) =>{
    try{
         const student = await User.findOne({
        where: {
            uuid: req.params.id
        }});
        if(!student) return res.status(404).json({msg:'rrrr'});
        const {name,email,regno,parent,s_class,password} = req.body;
        if(req.role === 'admin'){
            await Students.update({name,email,regno,parent,s_class,password},{
                where:{
                    id: student.id
                }
            })
        }
        else{
            if(req.userId !== student.userId) return res.status(403).json({msg:'hhhh'});
            await Students.update({name,email,regno,parent,s_class,password},{
                where:{
                    [Op.and]:[{id:student.id},{userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg:'Student update successfult'});
    }catch(error){
        res.status(500).json({msg:error.message});

    }
}
    
    
export const deleteStudent = async(req, res) =>{
    
    try{
       const student = await User.findOne({
        where: {
            uuid: req.params.id
        }
    }); 
    if(!student) return res.status(404).json({msg:'hhhh'});
    const {name,email,regno,parent,s_class,password} = req.body;
    if (req.role === 'admin'){
        await Students.destroy({
            where:{
                id:student.id
            }
        })
    }else{
        if(req.userId !== student.userId) return res.status(403).json({msg:'kkkk'})
        await Students.destroy({
            where:{
                [Op.and]:[{id: student.id},{userId:req.userId}]
            }
        })
    }
    res.status(200).json({msg:'Student deleted successfully'})
    }
    
   catch (error) {
        res.status(500).json({msg: error.message});
    }
}