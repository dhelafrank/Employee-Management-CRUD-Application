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
    async departmentByIndex(index, callback) {
        try {
            await this.all((responseData) => {
                let sortedDepartments = responseData.data.sort((a, b) => {
                    return a._id - b._id
                })
                const departmentGotten = sortedDepartments[index]
                // console.log(`\n\nRaw Department gotten from sorting function ${JSON.stringify(sortedDepartments)}\n\n`);
                callback(departmentGotten)
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = departmentsClass