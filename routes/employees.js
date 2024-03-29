const express = require('express')
const router = express.Router()
const employeesClass = require('../controllers/employees')
const employees = new employeesClass()

router.get("/all", async (req, res, next) => {
    try {
        await employees.all((responseData) => {
            res.json(responseData)
        })
    } catch (error) {
        console.log(error);
    }
})

router.put("/new", async (req, res, next) => {
    try {
        await employees.createNew(req.body, (responseData) => {
            res.json(responseData)
        })
    } catch (error) {
        console.log(error);
    }
})


router.post("/update/:id", async (req, res, next) => {
    try {
        await employees.update(req.body, (responseData) => {
            res.json(responseData)
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/delete", async (req, res, next) => {
    try {
        await employees.delete(req.body.id, (responseData) => {
            res.json(responseData)
        })
    } catch (error) {
        console.log(error);
    }
})



module.exports = router