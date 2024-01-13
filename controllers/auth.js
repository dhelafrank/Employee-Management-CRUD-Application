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

const login = async (loginData, res, responseCallback) => {

    const {
        email,
        password
    } = loginData

    let user = admin

    if ((email == user.emailAddress) == false) {
        responseCallback({
            statusCode: 403,
            status: false,
            message: "User does not exist",
            data: []
        })
        return
    }

    //Password will be Unhashed here in the future
    if ((password == user.passwordHash) == false) {
        responseCallback({
            statusCode: 403,
            status: false,
            message: "Invalid Login Credentials",
            data: []
        })
        return
    }

    const {
        passwordHash,
        ...loggedInUser
    } = user

    const cookieData = {
        user: loggedInUser
    }

    responseCallback({
        statusCode: 200,
        status: true,
        message: "Login Success",
        data: [loggedInUser]
    }, cookieData)
}

module.exports = {
    login
}