const express = require('express')
const router = express.Router()
const departmentsClass = require('../controllers/departments')
const departments = new departmentsClass()

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