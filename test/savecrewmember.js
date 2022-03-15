var expect = require('chai').expect;
var savecrewmemberMW = require('../middleware/crew/savecrewmember');

describe('savecrewmember middleware ', function () {

    it('should save the given crewmember and redirect to the employee list ', function (done)
        {
            var req = {};
            var res = {
                tpl: {}
            };

            const mw = savecrewmemberMW({
                crewmemberModel: 'mock'
            });

            mw(
                {
                    body: {
                        nev: 'Dummy',
                        beosztas: 'tesztalany'
                    }
                },
                {
                    tpl: {
                        crewmember: {
                            save: cb => {
                                cb(null);
                            }
                        }
                    },
                    redirect: where => {
                        expect(where).to.be.eql('/crew/list');
                        done();
                    }
                },
                err => {
                    expect(err).to.eql(undefined);
                }
            )
        });

    it('should call next() if there is an error while saving  ', function (done)
    {
        var req = {};
        var res = {
            tpl: {}
        };

        const mw = savecrewmemberMW({
            crewmemberModel: 'mock'
        });

        mw(
            {
                body: {
                    nev: 'Dummy',
                    beosztas: 'tesztalany'
                }
            },
            {
                tpl: {
                    crewmember: {
                        save: cb => {
                            cb('hiba');
                        }
                    }
                },
                redirect: where => {
                }
            },
            err => {
                expect(err).to.eql('hiba');
                done();
            }
        )
    });

    it('should make a new crewmember on res.tpl  ', function (done)
    {
        var req = {};
        var res = {
            tpl: {}
        };

        class mockModel{
            save(cb){
                cb(null);
            }
        }

        const mw = savecrewmemberMW({
            crewmemberModel: mockModel
        });

        mw(
            {
                body: {
                    nev: 'Dummy',
                    beosztas: 'tesztalany'
                }
            },
            {
                tpl: {
                    crewmember: {
                        save: cb => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                    expect(where).to.be.eql('/crew/list');
                    done();
                }
            },
            err => {
                expect(err).to.eql(null);
                done();
            }
        )
    });

    it('should return next(), when req.dody.nev is undefined  ', function (done)
    {
        var req = {};
        var res = {
            tpl: {}
        };

        const mw = savecrewmemberMW({
            crewmemberModel: 'mock'
        });

        mw(
            {
                body: {
                    beosztas: 'tesztalany'
                }
            },
            {
                tpl: {
                    crewmember: {
                        save: cb => {
                            cb('hiba');
                        }
                    }
                },
                redirect: where => {
                }
            },
            err => {
                expect(err).to.eql(undefined);
                done();
            }
        )
    });
});