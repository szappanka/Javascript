const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rith1h', { useNewUrlParser: true });

module.exports = mongoose;