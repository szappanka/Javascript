/*
    ha jó értékeket küdött be a felhazsnáló regisztációnál, megpróbálja elmenteni
*/

var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

  const UserModel = requireOption(objectrepository, 'UserModel');

  return function (req, res, next) {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.email === 'undefined') ||
      (typeof req.body.phonenum === 'undefined' ||
      (typeof req.body.city === 'undefined')) ||
      (typeof req.body.bdate === 'undefined') ||
      (typeof req.body.password === 'undefined')) {
      return next();
    }

    UserModel.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result !== null)) {
        res.locals.error = 'Your email address is already registered!';
        return next();
      }

      const newUser = new UserModel();

      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.phonenum = req.body.phonenum;
      newUser.city = req.body.city;
      newUser.bdate = req.body.bdate;
      newUser.password = req.body.password;

      newUser.save(function (err) {
        return res.redirect('/');
      });
    });
  };
};