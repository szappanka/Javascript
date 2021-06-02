/*
    törli a posztot, ha kész visszairányít a profilra
*/

//const requireOption = require('../common').requireOption;
const requireOption = require('../common');

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.user === 'undefined') {
      return next();
    }

    res.locals.post.remove(function (err) {

      return res.redirect('/profile/'+res.locals.user._id);

    })
  };
};