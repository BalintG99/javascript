const requireOption = require('../common').requireOption;

/**
 * Autó nélküli alkalmazottak listázása
 */

module.exports = function(objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function(req, res, next) {

        crewmemberModel.find({ _utasa: null }, function (err, freecrew) {
            if (err) {
                return next(err);
            }
            res.tpl.freecrew = freecrew;
            freecrew.forEach(freecrew => console.log(freecrew.nev + "  " + freecrew._utasa));
            return next();
        });
    };
};