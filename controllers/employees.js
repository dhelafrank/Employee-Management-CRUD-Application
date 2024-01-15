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
    async view(name, callback) {
        try {
            const employee = await employees.findOne(name)
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
        // console.log(`\n\n\nTotal PerDepartment Requested \n\n\n`);
        try {
            const employeesArray = await employees.find({
                departments: {
                    $in: [departmentId]
                }
            })

            console.log(`\n\n\nEmployee for each department found ${employeesArray} \n\n\n`);
            return employeesArray
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = employeesClass