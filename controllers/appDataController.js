import appReview from "../models/appReview.js"

export const getReviewByAppName = async(req, res)=>{
    try {
        const {appName} = req.params
        const reviews = await appReview.find(appName)
        return res.status(500).json(reviews)


    } catch (error) {
        res.status(500).json({error: error.message})
    }
}