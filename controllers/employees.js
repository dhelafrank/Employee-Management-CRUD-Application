const fs = require('fs')
const path = require('path')
const {
    employees
} = require("../models/employee")
const {
    departments
} = require("../models/department")
const localEmployees = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/employees.json"), "utf-8"));


class employeesClass {
    async all(callback) {
        try {
            const allEmployees = await employees.find()
            callback({
                status: true,
                message: "succesful",
                data: allEmployees
            })
            return allEmployees
        } catch (error) {
            callback({
                status: false,
                message: "Employees from database could not be fetched",
                data: localEmployees
            })
            console.log(error);
        }
    }
    async createNew(data, callback) {
        data._id = Date.now() - 2000
        try {
            const newEmployee = new employees(data)
            await newEmployee.save()
            callback({
                status: true,
                message: "Employee Created Succesfully",
                data: [`${data.firstName} ${data.lastName}`]
            })
        } catch (error) {
            console.log(error);
            callback({
                status: false,
                message: "Internal Server Error",
                data: []
            })
        }
    }
    async delete(id, callback) {
        try {
            await employees.findOneAndDelete({
                _id: id
            })
            callback({
                status: true,
                message: "Employee Deleted Successfully",
                data: []
            })
        } catch (error) {
            console.log(error);
            callback({
                status: false,
                message: "Internal Server Error",
                data: []
            })
        }
    }

    async update(data, callback) {
        try {
            await employees.findOneAndUpdate(data)
            callback({
                status: true,
                message: "Employee Information Updated Successfully",
                data: []
            })
        } catch (error) {
            console.log(error);
            callback({
                status: false,
                message: "Internal Server Error",
                data: []
            })
        }

    }

    async view(nameObject, callback) {
        const {firstName, lastName} = nameObject
        try {
            const employee = await employees.find({firstName, lastName})
            callback({
                status: true,
                message: "Employee Found",
                data: employee
            })
            return employee
        } catch (error) {
            console.log(error);
            callback({
                status: false,
                message: "Internal Server Error",
                data: []
            })
        }
    }

    async perDepartment(departmentId) {
        try {
            const employeesArray = await employees.find({
                departments: {
                    $in: [departmentId]
                }
            })
            return employeesArray
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = employeesClass