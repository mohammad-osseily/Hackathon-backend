import mongoose, {Schema} from "mongoose";

const aiResponse = new Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        description: {type: String}
        }] 
})

export default mongoose.model('AiResponse', aiResponse)