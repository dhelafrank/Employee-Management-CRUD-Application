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
    quickActionBtn:``,
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
    quickActionBtn:employeesTemp.quickActionBtn(),
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
    quickActionBtn:departmentsTemp.quickActionBtn(),
    contents: await departmentsTemp.contents()
  });
});






// Renders Individaual Employee Screen by Name
router.get('/employees/new', validationMiddleware, async (req, res, next) => {
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle:"New Employee",
    menu: employeesTemp.menu(),
    quickActionBtn:``,
    contents:await employeesTemp.newEmployee(),
  });
});

// Renders Individaual Employee Screen by Name
router.get('/employees/:name', validationMiddleware, async (req, res, next) => {
  const employeeObject = await employeesTemp.individualEmployee(req.params.name)
  const {screenTitle, contents} = employeeObject

  // console.log(`EJS Object from route ${JSON.stringify(await employeeObject)}`);
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle,
    menu: employeesTemp.menu(),
    quickActionBtn:``,
    contents,
  });
});


// Renders Individual Department Screen by Name
router.get('/departments/:name', validationMiddleware, async (req, res, next) => {
  const departmentObject = await departmentsTemp.individualDepartment(req.params.name)
  const {screenTitle, contents} = departmentObject
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle,
    menu: departmentsTemp.menu(),
    quickActionBtn:``,
    contents,
  });
});




//Renders Employee Edit Screen
router.get('/employees/edit/:name', validationMiddleware, async (req, res, next) => {
  const employeeObject = await employeesTemp.editEmployee(req.params.name)
  const {screenTitle, contents} = employeeObject

  // console.log(`EJS Object from route ${JSON.stringify(await employeeObject)}`);
  res.render('dash', {
    organisation: process.env.ORGANISATION_NAME,
    projectName: process.env.PROJECT_NAME,
    screenTitle,
    menu: employeesTemp.menu(),
    quickActionBtn:``,
    contents,
  });
});


module.exports = router;