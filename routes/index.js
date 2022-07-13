const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/Story');

// Login
router.get('/', ensureGuest, (req, res) => {
    res.render('login', 
    {layout: 'login'})
    return;
})

// Dashboard
router.get('/dashboard', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }

})


module.exports = router;