var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


//In the future this route will be responsible for manageing different users that may use the software
//each user may have their own permissions for modifying aspects of the data