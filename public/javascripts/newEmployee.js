import {
    init,
    employeeDepartments
} from "./component/departmentsTag.js"
init([{
    "_id": 1,
    "name": "General Dentistry",
    "maxEmployees": 10
}, {
    "_id": 2,
    "name": "Pediatric Dentistry",
    "maxEmployees": 8
}, {
    "_id": 3,
    "name": "Restorative Dentistry",
    "maxEmployees": 12
}, {
    "_id": 4,
    "name": "Surgery",
    "maxEmployees": 15
}, {
    "_id": 5,
    "name": "Orthodontics",
    "maxEmployees": 10
}])

let newEmployeeForm = document.getElementById("new-employee-form")
newEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let firstName = document.getElementById("first-name").value
    let lastName = document.getElementById("last-name").value
    let dateOfBirth = createTimestamp(document.getElementById("dob").value)
    let dateOfEmployment = createTimestamp(document.getElementById("doe").value)
    let departments = employeeDepartments

    const formData = {
        firstName,
        lastName,
        dateOfBirth,
        dateOfEmployment,
        departments
    }

    alert(JSON.stringify(formData))

})

function createTimestamp(date){
    const dateObject = date.split("-")
    const timestamped = new Date(dateObject[0], dateObject[1]-1, dateObject[2]).getTime()
    return timestamped
}