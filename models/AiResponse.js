import mongoose, {Schema} from "mongoose";
import { User } from "./User.js";

const aiResponse = Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    prediction: {
        type: String,
        required: true
    },
    similarApps: [
        {appName: {
            type: String,
            required: true},
        description: {type: Sting}
        }] 
})

export default mongoose.Schema('AiResponse', aiResponse)