var express = require('express');
var router = express.Router();
const departmentsTemp = require('../templates/departments')
const employeesTemp = require('../templates/employees')
const dashTemp = require('../templates/dash')
const validationMiddleware = require('../middlewares/userValidation')

require('dotenv').config()

/* GET auth page. */
router.get('/', async (req, res, next) => {
  res.render('index', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME
  });
});

// GET home page
router.get('/dash', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Dashboard",
    menu: dashTemp.menu()
  });
});

router.get('/employees', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Employees",
    menu: employeesTemp.menu()
  });
});

router.get('/departments', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Departments",
    menu: departmentsTemp.menu()
  });
});

module.exports = router;