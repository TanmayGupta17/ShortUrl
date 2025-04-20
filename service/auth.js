const jwt = require('jsonwebtoken');
const secret = "Tanmay@1706";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // Ensure the role is included in the token
        },
        secret// Token expires in 1 hour
    );
}

function getUser(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret);
        console.log("Decoded token:", decoded); // Debugging: Log the decoded token
        return decoded; // Return the decoded payload
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};