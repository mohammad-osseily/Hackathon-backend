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
        const { page = 1, limit = 20 } = req.query; // Default to page 1, limit 20      
        try {
            const { appName } = req.params;
        
            const currentPage = parseInt(page, 10);
            const perPage = parseInt(limit, 10);
            const skip = (currentPage - 1) * perPage;
        
            // Find the document containing reviews for the specific app
            const appDocument = await appReview.findOne({ [appName]: { $exists: true } }).lean();
        
            if (!appDocument || !appDocument[appName]) {
                return res.status(404).json({ message: `No reviews found for app: ${appName}` });
            }
        
            const reviews = appDocument[appName];
            const total = reviews.length;
            const paginatedReviews = reviews.slice(skip, skip + perPage);
        
            const lastPage = Math.ceil(total / perPage);
            const nextPage = currentPage < lastPage ? currentPage + 1 : null;
            const prevPage = currentPage > 1 ? currentPage - 1 : null;
        
            res.json({
                data: paginatedReviews,
                total,
                per_page: perPage,
                current_page: currentPage,
                last_page: lastPage,
                next_page_url: nextPage
                ? `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}?page=${nextPage}&limit=${perPage}`
                : null,
                prev_page_url: prevPage
                ? `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}?page=${prevPage}&limit=${perPage}`
                : null,
            });
            } catch (error) {
            res.status(500).json({ message: "Error fetching paginated reviews: " + error.message });
            }
        };
      