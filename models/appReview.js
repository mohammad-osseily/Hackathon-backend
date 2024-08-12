import mongoose, {Schema} from "mongoose";

const appReviewsSchema = new Schema({}, { strict: false });


export default mongoose.model('AppReview', appReviewsSchema )