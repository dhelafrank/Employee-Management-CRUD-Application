const {
    employees
} = require("../models/employee")

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
                message: "Internal Server Error",
                data: []
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
}

module.exports = employeesClass