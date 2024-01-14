userValidation = (req, res, next) => {
    // try {
    //     const {
    //         user
    //     } = req.cookies.data 
    // } catch (error) {
    //     console.log(user);
    // }
    next()
}

module.exports = userValidation