const express = require('express');
const { handleUserSignUp, handleUserLogin } = require('../controller/user');
const router = express.Router();

// Render the login page
router.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs
});

// Handle login form submission
router.post('/login', handleUserLogin);

// Render the signup page
router.get('/signup', (req, res) => {
    res.render('signup'); // Render signup.ejs
});

// Handle signup form submission
router.post('/signup', handleUserSignUp);

module.exports = router;