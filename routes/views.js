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

// Renders Dashboard Screen
router.get('/dash', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Dashboard",
    menu: dashTemp.menu(),
    contents: dashTemp.contents()
  });
});

// Renders Employees Screen
router.get('/employees', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Employees",
    menu: employeesTemp.menu(),
    contents: await employeesTemp.contents()
  });
});

// Renders Departments Screen
router.get('/departments', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Departments",
    menu: departmentsTemp.menu(),
    contents: await departmentsTemp.contents()
  });
});





// Renders Individaual Employee Screen by Name
router.get('/employees/:name', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Employees",
    menu: employeesTemp.menu(),
    contents: await employeesTemp.individualContents()
  });
});


// Renders Individual Department Screen by Name
router.get('/departments/:name', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle: "Departments",
    menu: departmentsTemp.menu(),
    contents: await departmentsTemp.individualContents()
  });
});

module.exports = router;