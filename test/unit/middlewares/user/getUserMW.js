var expect = require('chai').expect;
var getUserMW = require('../../../../middlewares/user/getUserMW');

describe('getUserMW middleware ', function () {

    it('should set res.locals.user with a user object from db', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb(null, 'mochpost');
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            session: {
                userid: '08'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ user: 'mochpost' });
                done();
            });
    });

    it('should call next with error when there is a db problem', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb('adatbazishiba', null);
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            session: {
                userid: '08'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql('adatbazishiba');
                done();
            });
    });

    it('should call next when no post found in db', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb(undefined, null);
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            session: {
                userid: '08'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});