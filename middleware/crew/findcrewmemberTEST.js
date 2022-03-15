const requireOption = require('../common').requireOption;

/**
 * A beosztás nélküli alkalmazottak listázása
 */

module.exports = function(objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function(req, res, next) {

        crewmemberModel.find({ beosztas: "" }, function (err, freecrew) {
            if (err) {
                return next(err);
            }
            res.tpl.freecrew = freecrew;
        });
        res.tpl.freecrew.forEach(freecrew => console.log(freecrew.nev + "  " + freecrew.beosztas));
        return next();
    };
};