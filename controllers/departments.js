const fs = require('fs')
const path = require('path')
const {
    departments
} = require("../models/department")
const localDepartments = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/departments.json"), "utf-8"))


class departmentsClass {
    async all(callback) {
        try {
            const allDepartments = await departments.find()
            callback({
                status: true,
                message: "succesful",
                data: allDepartments
            })
            return allDepartments
        } catch (error) {
            callback({
                status: false,
                message: "Departments from database  could not be fetched",
                data: localDepartments
            })
            console.log(error);
        }
    }

    createNew(data) {
        try {

        } catch (error) {

        }
    }
    delete(id) {
        try {

        } catch (error) {

        }
    }
    view() {
        try {

        } catch (error) {

        }
    }
}

module.exports = departmentsClass