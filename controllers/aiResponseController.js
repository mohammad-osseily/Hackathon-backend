import AiResponse from "../models/AiResponse.js"
import User from "../models/User.js"

export const createAiResponse = async  (req, res)=>{
    const {user_id, prediction, similarApps} = req.body

    try {
        const userExist = await User.findById(user_id)
        if(!userExist){
            return res.status(404).json({error: "user not found"})
        }

        const aiResponse = await AiResponse.create({
            user_id,
            prediction,
            similarApps
        })
        res.status(201).send({
            aiResponse
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getAiResponse = async (req, res)=>{
    const userId = req.user.id
    
    try {
        const response = await AiResponse.findById(userId)
        if(!response){
            return res.status(404).json({error: "response not found"})
        }
        res.status(200).json({response})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}