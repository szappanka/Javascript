/*
    elmenti az adatokat és ha sikeres, visszairányít a profilra
*/

var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

  const PostModel = requireOption(objectrepository, 'PostModel');
  
  return function (req, res, next) {
    if (
      typeof req.body.list === 'undefined' ||
      typeof req.body.ps === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.post === 'undefined') {
      res.locals.post = new PostModel();
      res.locals.post._writer = res.locals.user._id;
      //var date = new Date();
      res.locals.post.date = new Date().toISOString().slice(0,16).replace(/-/g,'.').replace(/T/g,'. ');
      res.locals.post._helper = null;
    }
    
    res.locals.post.list = req.body.list;
    res.locals.post.ps = req.body.ps;
    
    res.locals.post.save(err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/profile/${res.locals.user._id}');
    });
  };
};