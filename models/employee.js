const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    _id:{type:Number},
    firstName:{type:String},
    otherNames:{},
    surName:{},
    dateOfBirth:{},
    dateOfEmployement:{},
    departments:{},
    createdAt:{}
})