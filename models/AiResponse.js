import mongoose, {Schema} from "mongoose";

const aiResponse = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating_predictions: {
        type: [Number], 
        required: true
    },
    installs_predictions: {
        type: [Number],
        required: true
    }
}, { timestamps: true })

export default mongoose.model('AiResponse', aiResponse)