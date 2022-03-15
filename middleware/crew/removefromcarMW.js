const requireOption = require('../common').requireOption;

//const crewmember = require('../../models/crewmember');
// const mongoose = require('mongoose');
/**
 * Alkalmazott eltávoltása a járműből
 */

module.exports = function (objectrepository) {

   const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function (req, res, next) {

        if (typeof res.tpl.crewmember === 'undefined' ||
            typeof res.tpl.crewmember._utasa === 'undefined' ) {
            console.log("removefromcar: res.tpl.crewmember undefined");
            return next();
        }

      let carid = res.tpl.crewmember._utasa;

        crewmemberModel.findOneAndUpdate(
            { _id: res.tpl.crewmember._id },
            { $unset: { _utasa: ""} },
            err => {
            if (err) {
                return next(err)
            }; }
        );
            return res.redirect('/car/editcrew/' + carid );
        };
    };