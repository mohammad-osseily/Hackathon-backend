import Request from "../models/AiRequest.js";
import User from "../models/User.js";

export const createRequest = async (req, res) => {
  const { user_id, title, category, description } = req.body;

  try {
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(404).json({ error: "user not found" });
    }

    const newRequest = new Request({
      user_id,
      title,
      category,
      description,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const user_id = req.user.id;
  try {
    const user_id = req.user._id; // Extract the user ID from the decoded token

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
