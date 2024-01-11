const mongoose = require('mongoose')
const departments = require('./department')

const employeesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Number,
        required: true
    },
    dateOfEmployement: {
        type: Number,
        required: true
    },
    departments: {
        type: [departments._id],
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