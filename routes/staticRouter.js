const express = require('express');
const URL = require('../models/url');
const { restrictTo, checkforAuthentication } = require('../middleware/auth');
const router = express.Router();

router.get('/admin/urls',checkforAuthentication, restrictTo(["ADMIN"]), async (req, res) => {
    try {
        const allUrls = await URL.find({});
        // console.log("Fetched URLs for user:",allUrls);

        // Render the home.ejs template and pass the URLs to it
        return res.render("home", { urls: allUrls });

    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/',checkforAuthentication, restrictTo(["NORMAL"]), async (req, res) => {
    try {
        // // Check if the user is logged in
        // if (!req.user) {
        //     return res.redirect("/user/login"); // Redirect to login page if not authenticated
        // }

        console.log("Logged-in user:", req.user); // Debugging: Log the user object

        // Fetch URLs created by the logged-in user
        const allUrls = await URL.find({ createdBy: req.user._id });
        console.log("Fetched URLs for user:", req.user._id, allUrls);

        // Render the home.ejs template and pass the URLs to it
        return res.render("home", { urls: allUrls });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

module.exports = router;