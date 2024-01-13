var express = require('express');
var router = express.Router();
require('dotenv').config()
const {
  login
} = require('../controllers/auth')

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const dataRecieved = req.body

  try {
    await login(dataRecieved, res, (responseObject, cookieData) => {
      responseObject.redirect = "/dash"
      
      res.status(responseObject.statusCode).cookie('data', cookieData, {
        maxAge: process.env.SESSION_TIMEOUT,
        httpOnly: true
      }).json(responseObject)
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: []
    })
    console.log(error);
  }
});

module.exports = router;


//In the future this route will be responsible for manageing different users that may use the software
//each user may have their own permissions for modifying aspects of the data