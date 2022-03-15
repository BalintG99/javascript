const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/annbwp');
module.exports = mongoose;