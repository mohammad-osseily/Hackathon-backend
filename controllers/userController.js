import { User } from "../models/User.js";
import bcrypt from 'bcrypt'; 
import jwt from "jsonwebtoken"

export const createUser = async (req, res) => {
    try {
        const { fname, email, password } = req.body;

        if (!fname || !email || !password) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).send({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fname: fname,
            email: email,
            password: hashedPassword
        });

        res.status(201).send({
            user,
            message: "User created successfully"
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
}

export const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.send({
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({id: user._id,role: user.role},process.env.JWT_SECRET)
        return res.status(200).json({
            user, 
            token,
            message: "success"
        })
    }catch(e){
        res.status(500).send({
            message: e.message
        })
    }
}