import mongoose, { Schema } from "mongoose";

const appSchema = new Schema({
  app: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  size: { type: String },
  installs: { type: String },
  type: {
    type: String,
    enum: ["Free", "Paid"], // List valid values
    required: true,
  },
  price: { type: String },
  contentRating: { type: String },
  genres: { type: String },
  lastUpdated: { type: Date },
  currentVer: { type: String },
  androidVer: { type: String },
});

const App = mongoose.model("App", appSchema);

export default App;
