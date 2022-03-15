const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Car = db.model('Car', {
    rendszam: String,
    ferohely: Number,
    tipus: String
    }
);

module.exports = Car;