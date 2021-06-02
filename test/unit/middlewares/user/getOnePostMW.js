var expect = require('chai').expect;
var getOnePostMW = require('../../../../middlewares/post/getOnePostMW');

describe('getOnePostMW middleware ', function () {

    it('should set res.locals.post with a post object from db', function (done) {
        const mw = getOnePostMW({
            PostModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb(null, 'mochpost');
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            params: {
                postid: '08'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ post: 'mochpost' });
                done();
            });
    });

    it('should call next with error when there is a db problem', function (done) {
        const mw = getOnePostMW({
            PostModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb('adatbazishiba', null);
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            params: {
                postid: '08'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql('adatbazishiba');
                done();
            });
    });

    it('should call next when no post found in db', function (done) {
        const mw = getOnePostMW({
            PostModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '08' });
                    cb(undefined, null);
                }
            }
        });

        const resMock = { locals: {} };

        mw({
            params: {
                postid: '08'
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