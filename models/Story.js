const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// User Schema
const StorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

// exports the User model
module.exports = mongoose.model('Story', StorySchema);
