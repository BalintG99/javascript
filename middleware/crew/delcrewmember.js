/**
 * Alkalmazott törlése az adatbázisból
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

		if (typeof res.tpl.crewmember === 'undefined') {
			return next();
		}
		
		res.tpl.crewmember.remove(err => {
			if (err) {
				return next(err);
			}
			
			return res.redirect('/crew/list');
		});	
    };
};