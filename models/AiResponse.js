import mongoose, {Schema} from "mongoose";

const aiResponse = new Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numberOfInstalls:{
        type: Number,
        required: true
    }
})

export default mongoose.model('AiResponse', aiResponse)