const requireOption = require('../common').requireOption;
const mongoose = require('mongoose');
/**
 * Alkalmazott hozzáadása járműhöz,de csak ha van még szabad hely
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

        if (typeof req.body.ujUtasid === 'undefined' ||
            typeof req.body.carid === 'undefined') {
            return next();
        }

        crewmemberModel.count({ _utasa : mongoose.Types.ObjectId(req.body.carid) }, function (err, count) {
            if (err) {
                return next(err);
            }
            let FoglaltHelyek = count;
            console.log("Foglalt helyek: " + FoglaltHelyek);

            if ( res.tpl.car.ferohely > FoglaltHelyek ) {
                crewmemberModel.findOneAndUpdate(
                    { _id: req.body.ujUtasid },
                    { $set: { _utasa: req.body.carid} },
                    err => {
                        if (err) {
                            return next(err)
                        }; }
                );
            }
        });
        return res.redirect('/car/editcrew/'+ req.body.carid);
    };
};