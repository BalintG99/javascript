/**
var expect = require('chai').expect;
var removefromcarMW = require('../middleware/crew/removefromcarMW');
const crewmemberModel = require("../models/crewmember");

describe('removefromcar middleware ', function () {

        let testcrewmember1 = new crewmemberModel();
        testcrewmember1.nev = "Dummy Dummysson";
        testcrewmember1.beosztas = "tesztalany";
        testcrewmember1._id = 'id1';
        testcrewmember1._utasa = undefined;

        let testcrewmember2 = new crewmemberModel();
        testcrewmember2.tipus = "Dummy McDummyface";
        testcrewmember2.beosztas = "tesztalany";
        testcrewmember2._id = 'id2';
        testcrewmember2._utasa = 'carid';

        mongomock.MongoClient().db.collection= [testcrewmember1, testcrewmember2];

    it('should clear the _utasa param. of the chosen crewmember ', function (done) {

        var req = {};
        var res = {
            tpl: {crewmember: testcrewmember2}
        };

        console.log(res.tpl.crewmember);

        var testModel = {
            find: function (some, callback) {
                callback(undefined, [testcrewmember1, testcrewmember2])
            }
        };

        removefromcarMW({
            crewmember: testModel
        })(req, res, function (err) {
            expect(testcrewmember1._utasa).to.eql(undefined);
            expect(testcrewmember2._utasa).to.eql('carid');
            expect(err).to.eql(undefined);
            done();
        });
    });
/**
    it('should return error when db returns error', function (done) {
        var errorModel = {
            find: function (some, callback) {
                callback('ajjajjajj', undefined)
            }
        };

        getcarsMW({
            carModel: errorModel
        })({}, {}, function (err) {
            expect(err).to.eql('ajjajjajj');
            done();
        });
    });
}); **/
