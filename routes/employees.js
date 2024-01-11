const express = require('express')
const router = express.Router()
const employeesClass = require('../controllers/employees')
const employees = new employeesClass()

router.get("/all", async (req, res, next) => {

})

router.put("/new", async (req, res, next)=>{

})

router.post("/edit/:id", async (req, res, next)=>{

})

router.delete("/delete/:id", async (req, res, next)=>{

})

router.get("/view/:id", async (req, res, next)=>{
    
})

module.exports = router