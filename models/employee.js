const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Number,
        required: true
    },
    dateOfEmployment: {
        type: Number,
        required: true
    },
    departments: {
        type: [Number],
        default: []
    },
    createdAt: {
        type:Number,
        default:Date.now()
    }
})

const employees = mongoose.model('employees', employeesSchema)
module.exports = {
    employees
}