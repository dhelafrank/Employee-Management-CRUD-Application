const fs = require('fs')
const path = require('path')
const {
    departments
} = require("../models/department")
const { response } = require('../app')
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
                message: "Departments from database could not be fetched",
                data: localDepartments
            })
            console.log(error);
            return localDepartments
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
    async view(searchQuery, callback) {
        try {
            const department = await departments.find(searchQuery)
            callback({
                status: true,
                message: "department Found",
                data: department
            })
            return department
        } catch (error) {
            console.log(error);
            callback({
                status: false,
                message: "Internal Server Error",
                data: []
            })
        }
    }
    async departmentByIndex(index) {
        try {
                const departmentGotten = await departments.find({_id:index})
                return departmentGotten[0]
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = departmentsClass