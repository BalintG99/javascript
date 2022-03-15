const requireOption = require('../common').requireOption;

/**
 * Jármű adatainak mentése / új jármű
 */

module.exports = function (objectrepository) {

    const carModel = requireOption(objectrepository, 'carModel');

    return function (req, res, next) {

		if(
			typeof req.body.ferohely === 'undefined' ||
			typeof req.body.tipus === 'undefined'	
		){
			return next();
		}

        if (typeof res.tpl.car === 'undefined') {
            res.tpl.car = new carModel();
        }			

        if (typeof req.body.rendszambetuk !== 'undefined' && typeof req.body.rendszamszamok !=='undefined') {
            res.tpl.car.rendszam = req.body.rendszambetuk.toUpperCase() + "-" + req.body.rendszamszamok;
        };

        res.tpl.car.ferohely = req.body.ferohely;
        res.tpl.car.tipus = req.body.tipus;
			
        res.tpl.car.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });			
    
    };

};