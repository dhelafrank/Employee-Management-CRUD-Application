const express = require('express')
const router = express.Router()
const departmentsClass = require('../controllers/departments')

const departments = new departmentsClass()

router.put("/new", async (req, res, next) => {
    const {
        departmentName
    } = req.body
    try {
        await departments.createNew({
            name: departmentName
        }, (responseData) => {
            res.json(responseData)
        })

    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong, please try again later",
            data: []
        })
        console.log(error);
    }
})

router.post("/edit/:id", async (req, res, next) => {

})

router.delete("/delete/:id", async (req, res, next) => {

})

module.exports = router