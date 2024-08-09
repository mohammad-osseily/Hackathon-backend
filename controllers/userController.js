import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'; 

export const createUser = async (req, res) => {
    try {
        const { full_name, email, password} = req.body
        const exist = await User.findOne({email})

        if (exist){
            return res.status(400).send({
                message: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            full_name,
            email,
            password : hashedPassword
        })
        user.save()
        res.status(200).send({
            user,
            message: "success"
        })
    }catch(e){
        res.status(500).send({
            message: e.message
        })
    }
}

