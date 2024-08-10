import Request from "../models/Request.js";
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
