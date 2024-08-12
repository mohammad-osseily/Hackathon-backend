import mongoose, {Schema} from "mongoose";

const appReviewsSchema = new Schema({
    appName: { type: String, required: true },
    reviews: [
        {
            Translated_Review: String,
            Sentiment: String,
            Sentiment_Polarity: Number,
            Sentiment_Subjectivity: Number
        }
    ]
})


export default mongoose.model('AppReview', appReviewsSchema )