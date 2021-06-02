/*
    adott ember által elfogadott posztokat kilistázza
*/

var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');

    return function (req, res, next) {

        PostModel.find({_helper: res.locals.user._id}, (err, help) => {
            if (err) {
                return next(err);
            }

            res.locals.help = help;
            return next();
        }).populate('_writer');
    };
};