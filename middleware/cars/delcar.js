const crewmember = require('../../models/crewmember');

/**
 * Autó, és a hozzá tartozó adatok törlése az adatbázisból
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

		if (typeof res.tpl.car === 'undefined') {
		  return next();
		}

		crewmember.updateMany(
			{_utasa: res.tpl.car._id},
			{ $unset: { _utasa: ""} },
			err => {
				if (err) {
					return next(err)
				}; }
		);

		res.tpl.car.remove(function (err) {
		  if (err) {
			return next(err);
		  }

		res.redirect('/');
		});
	};
};