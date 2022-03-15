const requireOption = require('../common').requireOption;

/**
 * Alkalmazott adatainak mentése / új alkalmazott felvétele az adatbázisba
 */

module.exports = function (objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function (req, res, next) {

		if(
			typeof req.body.nev === 'undefined' ||
            typeof req.body.beosztas === 'undefined'
            ) {
            return next();
        }

        if (typeof res.tpl.crewmember === 'undefined') {
            res.tpl.crewmember = new crewmemberModel();
        }

        res.tpl.crewmember.nev = req.body.nev;
        res.tpl.crewmember.beosztas = req.body.beosztas;
        res.tpl.crewmember._utasa = null;

        res.tpl.crewmember.save(err => {
            if (err) {
                return next(err);
            }

        return res.redirect(`/crew/list`);
		});
    };
};