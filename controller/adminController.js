import bcrypt from "bcrypt";
import mongoose, { get } from "mongoose";
import { Admin } from "../model/adminModel.js";
import jwt from "jsonwebtoken";


export const register = (req, res) => {


    try {
        const { fname, lname, email, password } = req.body
        
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" })
        }

            // .............encryption........ //

        //(saltRounds=10)
        //  req.body.password = myPlaintextPassword  //

        bcrypt.hash(req.body.password, 10, async(err, hash) => {
            const newAdmin = new Admin({
                email,fname,lname,password:hash,
            })

            const saveAdmin = await newAdmin.save();

            if(saveAdmin){
               return res.status(201).json({user:saveAdmin,message: 'successfully inserted admin into db' });
            }
    })

    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }

}


export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" })
    }

    const getAdmin = await Admin.findOne({email})

    if(!getAdmin){
       return res.status(400).json({ message: 'invalid email' })
    }
// ------
    
    bcrypt.compare(req.body.password, getAdmin.password).then(function (result) {
        
        if (result) {


            const token = jwt.sign({ userId: getAdmin._id,isAdmin:getAdmin.isAdmin  }, 'shhhhh');

            // userid = userid,
            // isAdmin = true

            // GENERATE JWT TOKEN

            return res.status(200).json({ users: getAdmin, message: 'Successfull',token })
        } else {
            return res.status(400).json({ message: "Invalid Email or Password" })

        }
    });

}


export const getAdmin = async (req, res) => {

    try {
        const { id } = req.params;

    const getAdmin = await Admin.findById(id)

    if (!getAdmin) {
        return res.status(400).json({ message: "admin is not found!" })
    }

    return res.status(200).json({users:getAdmin,message: 'invalid email' })
    } catch (error) {
    return res.status(400).json({message: error.message || 'error' })
        
    }

}

export const getAllAdmin = async (req, res) => {
    console.log('====================================');
    // console.log();
    console.log('====================================');
    try {

    const getAllAdmin = await Admin.find()

    if (!getAllAdmin.length > 0) {
        return res.status(400).json({ message: "colletion is not found!" })
    }

    return res.status(200).json({users:getAllAdmin,message: 'users' })
    } catch (error) {
    return res.status(400).json({message: error.message || 'error' })
        
    }

}