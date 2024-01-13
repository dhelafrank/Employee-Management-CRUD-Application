userValidation =(req, res, next) => {
    const {user, session} = req.cookies.data;
    console.log(user);
    next()
}

module.exports = userValidation