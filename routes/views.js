var express = require('express');
var router = express.Router();
require('dotenv').config()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    organisation: process.env.ORGANISATION_NAME,
    projectName:process.env.PROJECT_NAME
  });
});

module.exports = router;