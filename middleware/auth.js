const { getUser } = require("../service/auth");

const checkforAuthentication = (req, res, next) => {
    const token = req.cookies.uid || req.headers.authorization?.split("Bearer ")[1];
    console.log("Token received:", token); // Debugging: Log the token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = getUser(token);
    console.log("User from token:", user); // Debugging: Log the user object
    if (!user) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach user info to the request
    next();
};

const restrictTo = (allowedRoles) => {
    return (req, res, next) => {
        console.log("User in restrictTo middleware:", req.user); // Debugging: Log the user object
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            console.log(`Access denied for role: ${req.user?.role}`); // Debugging: Log the denied role
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = {
    checkforAuthentication,
    restrictTo,
};
// const restrictToLoggedInUserOnly = async(req,res,next)=>{
//     const userUid = req.headers["Authorization"];

//     if(!userUid){
//         return res.redirect("./login");
//     }
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(userUid);
//     if(!user){
//         return res.redirect("./login");
//     }
//     req.user = user;
//     next();
// };

// const checkAuth = async(req,res,next) =>{
//     const userUid = req.cookies.uid;

    
//     const user = getUser(userUid);
    
//     req.user = user;
//     next();
// }
