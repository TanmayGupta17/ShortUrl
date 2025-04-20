const { nanoid } = require('nanoid');
const URL  = require('../models/url');
const Url = require('../models/url');

const GenerateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: "No URL provided in the request body" });
        }

        // Check if the URL already exists in the database
        const urlExists = await URL.findOne({ redirectUrl: url });
        if (urlExists) {
            console.log("URL already exists:", urlExists);

            // Fetch all URLs from the database
            const allUrls = await URL.find({createdBy: req.user._id});

            // Render the home.ejs template with updated data
            return res.render("home", { urls: allUrls });
        }

        // If the URL doesn't exist, create a new short URL
        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectUrl: url,
            VisitHistory: [],
            createdBy: req.user._id,
        });

        // Fetch all URLs from the database
        const allUrls = await URL.find({createdBy: req.user._id});

        // Render the home.ejs template with updated data
        return res.render("home", { urls: allUrls });
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const handleGetAnalytics =  async (req, res) => {
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId,createdBy: req.user._id});
    if(!result){
        return res.status(404).json({message: "URL not found"});
    }
    return res.json({totalClicks : result.VisitHistory.length, Analytics: result.VisitHistory});
};

module.exports = {
    GenerateShortUrl,
    handleGetAnalytics
}