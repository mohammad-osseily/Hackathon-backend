import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
    translatedReview: String,
    sentiment: String,
    sentimentPolarity: Number,
    sentimentSubjectivity: Number
})

export default mongoose.model('')
