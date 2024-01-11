var express = require('express');
var router = express.Router();
require('dotenv').config()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: `${process.env.ORGANISATION_NAME} - ${process.env.PROJECT_NAME}`,
    organisation: process.env.ORGANISATION_NAME
  });
});

module.exports = router;