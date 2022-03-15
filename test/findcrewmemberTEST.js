/**
var expect = require('chai').expect;
var findcrewmemberTESTMW = require('../middleware/crew/findcrewmemberTEST');
const crewmemberModel = require("../models/crewmember");

describe('teszt middleware ', function () {

    var req = {};
    var res = {
        tpl: {}
    };

    let testcrewmember1 = new crewmemberModel();
    testcrewmember1.nev = "Dummy Dummysson";
    testcrewmember1.beosztas = "";
    testcrewmember1._utasa = null;

    let testcrewmember2 = new crewmemberModel();
    testcrewmember2.nev = "Dummy McDummyface";
    testcrewmember2.beosztas = "tesztalany";
    testcrewmember2._utasa = "testcar1._id";

    let testcrewmember3 = new crewmemberModel();
    testcrewmember3.nev = "Dummy Junior";
    testcrewmember3.beosztas = null;
    testcrewmember3._utasa = null;

    console.log("testcrewmember1 neve: " + testcrewmember1.nev);
    console.log("testcrewmember2 neve: " + testcrewmember2.nev);

    console.log("testcrewmember1 autója: " + testcrewmember1._utasa);
    console.log("testcrewmember2 autója: " + testcrewmember2._utasa);

    var testModel = {
        find: function (some, callback) {
            callback(undefined, [testcrewmember1, testcrewmember2, testcrewmember3])
        }
    };

    it('should return only beosztás nélküli crewmembers (crewmember 1 and 3) ', function (done) {

        findcrewmemberTESTMW({
            crewmemberModel: testModel
        })(req, res, function (err) {
            expect(res.tpl.freecrew).to.eql([testcrewmember1, testcrewmember3]);
            expect(err).to.eql(undefined);
            done();
        });
    });
}); **/
