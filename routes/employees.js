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
        // await employees.all((responseData) => {

        // })
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
})

router.post("/edit/:id", async (req, res, next) => {
    try {
        await employees.all((responseData) => {

        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/delete/:id", async (req, res, next) => {
    try {
        await employees.all((responseData) => {

        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/view/:id", async (req, res, next) => {
    try {
        await employees.all((responseData) => {

        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router