require("dotenv").config()
const {
    users
} = require("../models/users")

const admin = {
    _id: 1,
    firstName: process.env.ADMIN_NAME,
    otherNames: "Admin",
    lastName: "Admin",
    emailAddress: process.env.ADMIN_EMAIL,
    permission: 11111,
    passwordHash: process.env.ADMIN_PASS,
    createdAt: Date.now()
}

const login = async (loginData, responseCallback) => {

    const {
        email,
        password
    } = loginData

    let user = admin

    if (!email == user.emailAddress) {
        responseCallback({
            status: false,
            message: "User does not exist",
            data: []
        })
        return
    }

    //Password will be Unhashed here in the future
    if (!password == user.password) {
        responseCallback({
            status: false,
            message: "Invalid Login Credentials",
            data: []
        })
        return
    }

    const {passwordHash, ...loggedInUser} = user
    responseCallback({
        status: true,
        message: "Login Success",
        data: [loggedInUser]
    })
}

module.exports = {
    login
}