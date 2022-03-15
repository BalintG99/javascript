var expect = require('chai').expect;
var getcarsMW = require('../middleware/cars/getcars');
const carModel = require("../models/car");

describe('getcar middleware ', function () {

    it('should return all cars ', function (done) {
        var req = {};
        var res = {
            tpl: {}
        };

        var testModel = {
            find: function (some, callback) {
                callback(undefined, ['testcar1', 'testcar2'])
            }
        };

        getcarsMW({
            carModel: testModel
        })(req, res, function (err) {
            expect(res.tpl.cars).to.eql(['testcar1', 'testcar2']);
            expect(err).to.eql(undefined);
            done();
        });
    });

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
});
