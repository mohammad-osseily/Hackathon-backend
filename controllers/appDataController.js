import appReview from "../models/appReview.js"

export const getReviewByAppName = async(req, res)=>{
    try {
        const {appName} = req.params
        const reviews = await appReview.findOne({ [appName]: { $exists: true } });

        if (!reviews) {
          return res.status(404).json({ message: `No reviews found for app: ${appName}` });
        }    
        return res.status(200).json(reviews[appName]);


    } catch (error) {
        res.status(500).json({error: error.message})
    }
}