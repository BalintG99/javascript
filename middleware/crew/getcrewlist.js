const requireOption = require('../common').requireOption;

/**
 * Összes alkalmazott kilistázása
 */

module.exports = function (objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function (req, res, next) {

        crewmemberModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.crewlist = result;

            return next();
        });
    };
};