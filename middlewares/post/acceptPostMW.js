/*
    a felhazsnáló elfogadja az adott posztot, ezután visszairányít a posztokhoz
*/

var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

  const PostModel = requireOption(objectrepository, 'PostModel');
  return function (req, res, next) {
    
    res.locals.post._helper = res.locals.user._id;

    res.locals.post.save(err => {
      if (err) {
        return next(err);
      }

      return res.redirect('/posts');
    });
  };
};