import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    full_name:{        
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

export const User = mongoose.model('User', userSchema)