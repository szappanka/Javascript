const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    name: String,
    email: String,
    phonenum: String,
    bdate: String,
    city: String,
    password: String

});

module.exports = User;