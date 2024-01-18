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
    view() {
        try {

        } catch (error) {

        }
    }
    async departmentByIndex(index) {
        try {
            // let responseData = await this.all((data)=>{})
                // let sortedDepartments = responseData.sort((a, b) => {
                    // return a._id - b._id
                // })

                const departmentGotten = await departments.find({_id:index})
                return departmentGotten[0]
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = departmentsClass