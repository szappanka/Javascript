const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Post = db.model('Post', {
    list: String,
    ps: String,
    date: String,
    _writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _helper: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Post;