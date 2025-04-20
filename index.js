const express = require('express');
const PORT = 3000
const path = require('path');
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const { handleUserSignUp } = require('./controller/user');
const userRoute = require('./routes/user');
const cookieparser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const {checkforAuthentication,restrictTo} = require('./middleware/auth');


connectToMongoDB('mongodb://localhost:27017/url-shortener').then(() => {
  console.log('Connected to MongoDB');
}
).catch((err) => {  
  console.log('Failed to connect to MongoDB', err);
}
);

const app = express();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(checkforAuthentication);

app.use("/user", userRoute);
app.use("/", staticRouter);

app.use("/url", checkforAuthentication, restrictTo(["NORMAL"]), urlRoute);

// app.get('/test', async   (req, res) => {
//     console.log("GET /test route hit");
//     const allUrls = await URL.find();
//     return res.render("home",
//        { urls : allUrls}
//     );
// });

app.get('/favicon.ico', (req, res) => res.status(204).end()); // Ignore favicon requests

app.get('/:shortId', async (req, res) => {
    try {
        console.log("Full request URL:", req.originalUrl);
        console.log("Request params:", req.params);

        // Extract and trim the shortId
        const shortId = req.params.shortId.trim();
        console.log("Extracted shortId:", shortId);

        // Validate shortId format
        if (!/^[a-zA-Z0-9]{8}$/.test(shortId)) {
            return res.status(400).json({ message: "Invalid shortId format" });
        }

        // Find the URL entry in the database
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: { VisitHistory: { timestamp: new Date() } } // Log the visit
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Ensure the redirectUrl includes the protocol
        let redirectUrl = entry.redirectUrl;
        if (!/^https?:\/\//i.test(redirectUrl)) {
            redirectUrl = `http://${redirectUrl}`;
        }

        console.log("Redirecting to:", redirectUrl);
        res.redirect(redirectUrl);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

