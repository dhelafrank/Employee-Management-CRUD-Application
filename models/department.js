const mongoose = require('mongoose')

const departmentsSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: { 
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    maxEmployees:{
        type:Number,
        required:true
    },
    noOfEmployees:{
        type:Number,
        required:true
    }
})

const departments = mongoose.model('departments', departmentsSchema)
module.exports = {
    departments
}