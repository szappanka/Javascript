/*
    megvizsgálja be van-e jelentkezve a user
*/

module.exports = function(objectrepository) {
  return function(req, res, next) {
      
    if (typeof req.session.userid === 'undefined') {
          return res.redirect('/menu');
      }

      return next();
  };
};