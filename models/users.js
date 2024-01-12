const mongoose = require('mongoose')
const departments = require('./department')

const usersSchema = new mongoose.Schema({
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
    lastName: {
        type: String,
        required: true
    },
    emailAddress:{
        type:String,
        required:true
    },
    permission: {
        type: Number,
        required: true
    },
    passwordHash:{
        type:String,
        required:true
    },
    createdAt: {
        type:Number,
        default:Date.now()
    }
})

const users = mongoose.model('users', usersSchema)
module.exports = {
    users
}