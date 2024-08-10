import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fname:{        
        type: String,
        required: true,
    },
    email: {        
        type: String, 
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
})

export default mongoose.model('User', userSchema)