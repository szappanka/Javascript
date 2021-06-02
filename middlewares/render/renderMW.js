/*
    kirajzolja a weboldalt
*/

const requireOption = require('../common').requireOption;


module.exports = function (objectrepository, viewName) {

    return function (req, res) {
      res.render(viewName, res.locals);
    };
  
  };