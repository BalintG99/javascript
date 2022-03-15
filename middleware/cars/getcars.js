const requireOption = require('../common').requireOption;

/**
 * Összes jármű kilistázása a hozzájuk rendelt dolgozókkal együtt
 */

module.exports = function (objectrepository) {

    const carModel = requireOption(objectrepository, 'carModel');

    return function (req, res, next) {

		carModel.find({}, function (err, result) {
		  if (err) {
			return next(err);
		  }

		  res.tpl.cars = result;

        return next();
		});
	};
};