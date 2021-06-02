/*
    az összes még nem elfogadott posztot listázza ki
*/

var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');

    return function (req, res, next) {

        PostModel.find({_writer: {$ne : res.locals.user._id}, _helper: null}, (err, news) => {
            if (err) {
                return next(err);
            }

            res.locals.news = news;
            return next();
        }).populate('_writer');
    };
};