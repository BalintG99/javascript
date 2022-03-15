const requireOption = require('../common').requireOption;

/**
 * Egy alkalmazott adatait gyűjti össze
 * 	érvénytelen ID esetén visszairányít a főoldalra
 */

module.exports = function (objectrepository) {

    const crewmemberModel = requireOption(objectrepository, 'crewmemberModel');

    return function (req, res, next) {

	crewmemberModel.findOne(
		{
		_id: req.params.crewid
		},
		function (err, crewmember){
			if( err || !crewmember) {
				return next(err);
			}

        res.tpl.crewmember = crewmember;
		return next ();
		});
    };

};