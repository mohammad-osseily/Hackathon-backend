import axios from "axios";
import Request from "../models/AiRequest.js";
import User from "../models/User.js";
import AiRequest from "../models/AiRequest.js";

export const createRequest = async (req, res) => {
  const user_id = req.user.id;

  const {
    androidVer,
    size,
    price,
    categoryEncoded,
    typeFree,
    typePaid,
    contentRatingsAdultsOnly18,
    contentRatingsEveryone,
    contentRatingsEveryone10,
    contentRatingsMature17,
    contentRatingsTeen,
    contentRatingsUnrated,
    lastUpdatedYear,
    lastUpdatedMonth,
  } = req.body;

  try {
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRequest = new AiRequest({
      user_id,
      androidVer,
      size,
      price,
      categoryEncoded,
      typeFree,
      typePaid,
      contentRatingsAdultsOnly18,
      contentRatingsEveryone,
      contentRatingsEveryone10,
      contentRatingsMature17,
      contentRatingsTeen,
      contentRatingsUnrated,
      lastUpdatedYear,
      lastUpdatedMonth,
    });

    await newRequest.save();

    // Format the data to send to the ML model (Uncomment and use when needed)
    const formattedData = {
      Android_Ver: androidVer,
      Size: size,
      Price: price,
      Category_encoded: categoryEncoded,
      Type_Free: typeFree,
      Type_Paid: typePaid,
      Content_Ratings_Adults_only_18: contentRatingsAdultsOnly18,
      Content_Ratings_Everyone: contentRatingsEveryone,
      Content_Ratings_Everyone_10: contentRatingsEveryone10,
      Content_Ratings_Mature_17: contentRatingsMature17,
      Content_Ratings_Teen: contentRatingsTeen,
      Content_Ratings_Unrated: contentRatingsUnrated,
      last_updated_year: lastUpdatedYear,
      last_updated_month: lastUpdatedMonth,
    };

    // Send the formatted data to the ML model (Uncomment and use when needed)
    const mlEndpointUrl = 'http://localhost:7500/predict/rating'; 
    const mlResponse = await axios.post(mlEndpointUrl, formattedData);

    res.status(201).json({
      message: "Request created successfully",
      newRequest,
      mlResponse: mlResponse.data, // Uncomment when using the ML model
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const user_id = req.user.id;
  try {
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const latestRequest = await Request.findOne({ user_id }).sort({
      createdAt: -1,
    });

    if (!latestRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(latestRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

