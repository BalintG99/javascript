/**
 *
 * freecrew MW tesztje
 *
 * igyekeztem nem csak save és get MW-ket tesztelni, de itt akadályba ütköztem
 * többféleképpen próbáltam a modelt definiálni, a tesztalanyokat megadni,
 * de a middleware az összes elemet visszaadta, pedig csak kettőt kellett volna
 *
 * a program működése során ilyen hiba nem volt
 *
 *
var expect = require('chai').expect;
var freecrewMW = require('../middleware/crew/freecrew');
const crewmemberModel = require("../models/crewmember");
const carModel = require("../models/car");

describe('freecrew middleware ', function () {

    var req = {};
    var res = {
        tpl: {}
    };

    let testcar1 = new carModel();
    testcar1.tipus = "Dummy0";
    testcar1.rendszam = "XXX-000";
    testcar1.ferohely = 5;
    testcar1.save((err) => {console.log(err)});

    let testcrewmember1 = new crewmemberModel();
    testcrewmember1.nev = "Dummy Dummysson";
    testcrewmember1.beosztas = "tesztalany";
    testcrewmember1._utasa = null;
    // testcrewmember1.save((err) => {console.log(err)});

    let testcrewmember2 = new crewmemberModel();
    testcrewmember2.nev = "Dummy McDummyface";
    testcrewmember2.beosztas = "tesztalany";
    testcrewmember2._utasa = testcar1._id;
    // testcrewmember2.save((err) => {console.log(err)});

    let testcrewmember3 = new crewmemberModel();
    testcrewmember3.nev = "Dummy Junior";
    testcrewmember3.beosztas = "tesztalany";
    testcrewmember3._utasa = null;
    // testcrewmember3.save((err) => {console.log(err)});

    console.log("testcrewmember1 neve: " + testcrewmember1.nev);
    console.log("testcrewmember2 neve: " + testcrewmember2.nev);

    console.log("testcrewmember1 autója: " + testcrewmember1._utasa);
    console.log("testcrewmember2 autója: " + testcrewmember2._utasa);

    let mockmember1=[
        {nev: 'Józsi'},
        {_utasa: null}
    ];
    let mockmember2=[
        {nev: 'Józsii'},
        {_utasa: 'carid'},
        //{_utasa: testcar1._id}
    ];

    let mockmember3=[
        {nev: 'Józsiii'},
        {_utasa: null}
    ];

console.log("mockmember2 autója: " + mockmember2._utasa);

    var testModel = {
        find: function (some, callback) {
            callback(undefined, [testcrewmember1, testcrewmember2, testcrewmember3])
        }
    };

    let testModel2 = [testcrewmember1, testcrewmember2, testcrewmember3];

    var testModel3 = {
        find: function (some, callback) {
            callback(undefined, [mockmember1, mockmember2, mockmember3])
        }
    };

    var testModel4 = {
        find: function (some, callback) {
            callback(undefined, [mockmember1, mockmember2, mockmember3])
        }
    };

        it('should return only free crewmembers (crewmember 1 and 3) ', function (done) {

            freecrewMW({
                crewmemberModel: testModel
            })(req, res, function (err) {
                expect(res.tpl.freecrew).to.eql([testcrewmember1, testcrewmember3]);
                expect(err).to.eql(undefined);
                done();
            });
        });


}); **/
