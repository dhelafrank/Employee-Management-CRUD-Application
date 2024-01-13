module.exports = function (name) {
    const splittedName = name.split(" ")

    const nameObject = {
        firstName: splittedName[0],
        lastName: splittedName[1]
    }
    return nameObject
}