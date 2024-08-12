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
    category: {
      type: String,
      enum: [
        'ART_AND_DESIGN',
        'AUTO_AND_VEHICLES',
        'BEAUTY',
        'BOOKS_AND_REFERENCE',
        'BUSINESS',
        'COMICS',
        'COMMUNICATION',
        'DATING',
        'EDUCATION',
        'ENTERTAINMENT',
        'EVENTS',
        'FAMILY',
        'FINANCE',
        'FOOD_AND_DRINK',
        'GAME',
        'HEALTH_AND_FITNESS',
        'HOUSE_AND_HOME',
        'LIBRARIES_AND_DEMO',
        'LIFESTYLE',
        'MAPS_AND_NAVIGATION',
        'MEDICAL',
        'NEWS_AND_MAGAZINES',
        'PARENTING',
        'PERSONALIZATION',
        'PHOTOGRAPHY',
        'PRODUCTIVITY',
        'SHOPPING',
        'SOCIAL',
        'SPORTS',
        'TOOLS',
        'TRAVEL_AND_LOCAL',
        'VIDEO_PLAYERS',
        'WEATHER'
      ],
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
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model("AiRequest", aiRequestSchema);
