import mongoose from "mongoose";

const aiRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: { 
      type: String,
    },
    price: { 
      type: String ,
      required: true,

    },
    contentRating: { 
      type: String,
      required: true,
     },
    currentVer: { type: String },
    androidVer: { 
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Free', 'Paid'], 
      required: true
    },
    lastUpdated: { type: Date },

  },
  
);

export default mongoose.model("AiRequest", aiRequestSchema);
