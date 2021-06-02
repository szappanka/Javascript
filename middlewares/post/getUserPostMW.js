/*
    megkapjuk egy felhasználóhoz tartozó posztokat
*/

var requireOption = require('../common').requireOption;

module.exports = function(objectrepository) {
  
  const PostModel = requireOption(objectrepository, 'PostModel');

  return function(req, res, next) {
      if (typeof res.locals.user === 'undefined') {
          return next();
      }

      PostModel.find({ _writer: res.locals.user._id}, (err, userPost) => {
          if (err) {
              return next(err);
          }

          res.locals.userPost = userPost;
          return next();
      }).populate('_helper');
  };
};