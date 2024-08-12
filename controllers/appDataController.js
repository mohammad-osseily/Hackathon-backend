import App from "../models/App.js"; // Adjust the path to your model
import mongoose from "mongoose";
import appReview from "../models/appReview.js";

export const getApps = async (req, res) => {
  const { page = 1, limit = 50 } = req.query; // Default to page 1, limit 50

  try {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    const skip = (currentPage - 1) * perPage;

    const [apps, total] = await Promise.all([
      App.find()
        .sort({ _id: 1 }) // Sort by _id to ensure consistent order
        .skip(skip)
        .limit(perPage)
        .lean()
        .exec(),
      App.countDocuments(),
    ]);

    const lastPage = Math.ceil(total / perPage);
    const nextPage = currentPage < lastPage ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    res.json({
      data: apps,
      total,
      per_page: perPage,
      current_page: currentPage,
      last_page: lastPage,
      next_page_url: nextPage
        ? `${req.protocol}://${req.get("host")}${
            req.baseUrl
          }?page=${nextPage}&limit=${perPage}`
        : null,
      prev_page_url: prevPage
        ? `${req.protocol}://${req.get("host")}${
            req.baseUrl
          }?page=${prevPage}&limit=${perPage}`
        : null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching paginated apps: " + error.message });
  }
};

export const getReviewByAppName = async (req, res) => {
  console.log("Fetching reviews for app:", req.params.appName); // Debug log

  try {
    const { appName } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const appReviews = await appReview.findOne({ app: appName });

    if (!appReviews) {
      return res
        .status(404)
        .json({ message: `No reviews found for app: ${appName}` });
    }

    const allReviews = appReviews.reviews || [];
    const total = allReviews.length;
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    const skip = (currentPage - 1) * perPage;
    const paginatedReviews = allReviews.slice(skip, skip + perPage);

    const lastPage = Math.ceil(total / perPage);
    const nextPage = currentPage < lastPage ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    console.log("Reviews found and paginated."); // Debug log

    return res.status(200).json({
      data: paginatedReviews,
      total,
      per_page: perPage,
      current_page: currentPage,
      last_page: lastPage,
      next_page_url: nextPage
        ? `${req.protocol}://${req.get("host")}${req.baseUrl}${
            req.path
          }?page=${nextPage}&limit=${perPage}`
        : null,
      prev_page_url: prevPage
        ? `${req.protocol}://${req.get("host")}${req.baseUrl}${
            req.path
          }?page=${prevPage}&limit=${perPage}`
        : null,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error); // Debug log
    res.status(500).json({ error: error.message });
  }
};
