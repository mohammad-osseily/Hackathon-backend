import mongoose from "mongoose";

const aiRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appName: { 
      type: String, 
      required: true },

    androidVer: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryEncoded: {
      type: Number,
      required: true,
    },
    typeFree: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    typePaid: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsAdultsOnly18: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsEveryone: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsEveryone10: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsMature17: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsTeen: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    contentRatingsUnrated: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    lastUpdatedYear: {
      type: Number,
      required: true,
    },
    lastUpdatedMonth: {
      type: Number,
      required: true,
    },
  }, {
    timestamps: true,
  }
  
);

export default mongoose.model("AiRequest", aiRequestSchema);
