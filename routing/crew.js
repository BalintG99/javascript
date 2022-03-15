const renderMW = require ('../middleware/render');

const getcrewmemberMW = require ('../middleware/crew/getcrewmember');
const delcrewmemberMW = require ('../middleware/crew/delcrewmember');
const savecrewmemberMW = require ('../middleware/crew/savecrewmember');
const getcrewlistMW = require ('../middleware/crew/getcrewlist');

const carModel = require('../models/car');
const crewmemberModel = require('../models/crewmember');

module.exports = function (app) {

  const objectRepository = {
    carModel: carModel,
    crewmemberModel: crewmemberModel
  };

  /**
   * Alkalmazott lista
   */

  app.use('/crew/list',
      getcrewlistMW(objectRepository),
      renderMW(objectRepository, 'crewlist')
  );

    /**
     * Új alkalmazott felvétele
     */

    app.use('/crew/new',
        savecrewmemberMW(objectRepository),
        renderMW(objectRepository, 'addcrew')
    );

    /**
     * Alkalmazott adatainak szerkesztése
     */

    app.use('/crew/edit/:crewid',
        getcrewmemberMW(objectRepository),
        savecrewmemberMW(objectRepository),
        renderMW(objectRepository, 'editcrewmember')
    );

    /**
     * Alkalmazott eltávolítása
     */

    app.use('/crew/del/:crewid',
        getcrewmemberMW(objectRepository),
        delcrewmemberMW(objectRepository)
    );
};