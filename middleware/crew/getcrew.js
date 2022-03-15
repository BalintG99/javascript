const requireOption = require('../common').requireOption;

/**
 * Egy autóhoz tartozó emberek listázása
 */

module.exports = function(objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function(req, res, next) {

        if (typeof res.tpl.car === 'undefined') {
            console.log("getcrew: res.tpl.car undefined");
            return next();
        }

        crewmemberModel.find({ _utasa: res.tpl.car._id }, function (err, crew) {
            if (err) {
                return next(err);
            }
            res.tpl.crewmember = crew;
            return next();
        });
    };
};
