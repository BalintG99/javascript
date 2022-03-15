const requireOption = require('../common').requireOption;

/**
 * Egy jármű adatait gyűjti össze
 * 	érvénytelen rendszám esetén visszairányít a főoldalra
 */

module.exports = function (objectrepository) {

    const carModel = requireOption(objectrepository, 'carModel');

    return function (req, res, next) {

		carModel.findOne({
			_id: req.param('carid')},
			function (err, result){
				if(err){
					return next(err);
				}
		
		res.tpl.car = result;
		
        return next();
		});
	};
};