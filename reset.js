const fs = require('fs');

const Department = require("./models/department").departments
const Employee = require("./models/employee").employees

async function reset() {
    try {
        // Delete all documents in the collections
        await Department.deleteMany({});
        await Employee.deleteMany({});

        // Read data from JSON files
        const departmentsData = JSON.parse(fs.readFileSync('./data/departments.json', 'utf8'));
        const employeesData = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

        // Insert data into collections
        await Department.insertMany(departmentsData);
        await Employee.insertMany(employeesData);

        console.log('Database resetted successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = reset