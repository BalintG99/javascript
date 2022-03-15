const renderMW = require ('../middleware/render');

const getcarMW = require ('../middleware/cars/getcar');
const getcarsMW = require ('../middleware/cars/getcars');
const delcarMW = require ('../middleware/cars/delcar');
const savecarMW = require ('../middleware/cars/savecar');

const getcrewmemberMW = require ('../middleware/crew/getcrewmember');
const getcrewMW = require ('../middleware/crew/getcrew');
const removefromcarMW = require ('../middleware/crew/removefromcarMW');
const freecrewMW = require ('../middleware/crew/freecrew');
const addtocarMW = require ('../middleware/crew/addtocar');


const carModel = require('../models/car');
const crewmemberModel = require('../models/crewmember');

module.exports = function (app) {

  const objectRepository = {
      carModel: carModel,
      crewmemberModel: crewmemberModel
  };

    /**
     * Új autó hozzáadása
     */

    app.use('/car/new',
        savecarMW(objectRepository),
        renderMW(objectRepository, 'addcar')
    );

	/**
	* Autó adatainak módosítása
	*/

    app.use('/car/editcar/:carid',
        getcarMW(objectRepository),
        savecarMW(objectRepository),
        renderMW(objectRepository, 'modifycar'),
    );

    /**
     * Autó törlése
     */

    app.use('/car/delcar/:carid',
        getcarMW(objectRepository),
        delcarMW(objectRepository)
    );

	/**
	* Adott jármű legénységének szerkesztése
	*/

    app.use('/car/editcrew/:carid',
        getcarMW(objectRepository),
		getcrewMW(objectRepository),
        freecrewMW(objectRepository),
        addtocarMW(objectRepository),
        renderMW(objectRepository, 'crew'),
    );

    /**
     *  Utas eltávolítása a járműből
     */

    app.get('/car/removecrewmember/:carid/:crewid',
        getcarMW(objectRepository),
        getcrewmemberMW(objectRepository),
        removefromcarMW(objectRepository)
    );

    /**
     *  Utas hozzáadása a járműhöz
     */

    app.get('/car/addcrewmember/:crewid/:carid',
        getcrewmemberMW(objectRepository),
        getcarMW(objectRepository),
        addtocarMW(objectRepository)
    );

	/**
     * Autók listázása
     */

    app.get('/',
        getcarsMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

};