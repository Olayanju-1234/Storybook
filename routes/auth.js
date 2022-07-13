const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
}
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.log(err);
        }
    res.redirect('/');
    });
}
);


module.exports = router;