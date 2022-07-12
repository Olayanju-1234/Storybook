const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// Show add page
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// Process add page
router.post('/', ensureAuth, async (req, res) => {
    try {
        // const newStory = await Story.create({
        //     title: req.body.title,
        //     body: req.body.body,
        //     status: req.body.status,
        //     user: req.user.id
        // });
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Show all stories
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean();

        res.render('stories/index', {
            stories
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Edit story
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean();
        // Check if the story
        if (!story) {
            return res.render('error/404');
        }
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', {
                story
            });
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Update story
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById({ _id: req.params.id }).lean();
        // Check if the story
        if (!story) {
            return res.render('error/404');
        }
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Delete story
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Show single story
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById({ _id: req.params.id })
        .populate('user')
        .lean();

        if (!story) {
            return res.render('error/404');
        }

        res.render('stories/show', {
            story
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)

// Show all stories by user
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId,
            status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean();

        res.render('stories/index', {
            stories
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}
)




module.exports = router;