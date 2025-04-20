const User = require("../models/user");
const URL = require("../models/url");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleUserSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already exists:", email);
            return res.render("login");
        }

        // Create a new user
        await User.create({ name, email, password });

        // Fetch all URLs and render the home page
        // const allUrls = await URL.find({});
        return res.render("login");
    } catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email, password });
        // if (existingUser) {
        //     console.log("User logged in:", email);
        //     const sessionId = uuidv4();
        //     setUser(sessionId, existingUser);
        //     res.cookie("uid", sessionId);

        //     // Fetch all URLs and render the home page
        //     const allUrls = await URL.find({createdBy: req.user._id});
        //     return res.render("home", { urls: allUrls });
        // }
        if(!existingUser){
            console.log("Invalid email or password:", email);
            return res.render("login");
        }
        console.log("User logged in:", email);
        // const sessionId = uuidv4();
        // setUser(sessionId, existingUser);
        const token = setUser(existingUser);
        res.cookie("uid", token);

        // return res.json({token}); 

        // Fetch all URLs and render the home page
        const allUrls = await URL.find({createdBy: existingUser._id});
        return res.render("home", { urls: allUrls });
        

        
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    handleUserSignUp,
    handleUserLogin
};