const Schema = require('mongoose').Schema;
const db = require('../config/db');

const crewmember = db.model('crewmember', {
    nev: String,
    beosztas: String,
    _utasa: {
        type: Schema.Types.ObjectId,
        ref: 'car'
    }
});

module.exports = crewmember;