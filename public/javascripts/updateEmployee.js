import {
    init,
    employeeDepartments
} from "./component/departmentsTag.js"
import {
    toast
} from "./component/toast.js"
import {
    modalClass
} from "./component/modal.js"
const modal = new modalClass()


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


function UpdateTimestamp(date) {
    const dateObject = date.split("-")
    const timestamped = new Date(dateObject[0], dateObject[1] - 1, dateObject[2]).getTime()
    return timestamped
}

const updateBtn = document.querySelector('.update-employee-btn')

document.getElementById("update-employee-form").addEventListener("submit", (e) => {
    e.preventDefault()

    let firstName = document.getElementById("first-name").value
    let otherNames = ""
    let lastName = document.getElementById("last-name").value
    let dateOfBirth = UpdateTimestamp(document.getElementById("dob").value)
    let dateOfEmployment = UpdateTimestamp(document.getElementById("doe").value)
    let departments = employeeDepartments.sort()
    let _id = updateBtn.getAttribute("employee-id")

    const formData = {
        firstName,
        otherNames,
        lastName,
        dateOfBirth,
        dateOfEmployment,
        departments,
        _id
    }


    modal.open("Employee Update Confirmation", `<p>Are you sure you want to apply your changes to ${formData.firstName}?</p>
    <button class="btn primary-btn" id="final-employee-confirmation-btn" employee-id="${(e.target).getAttribute("employee-id")}">Confirm</button>`)

    document.getElementById("final-employee-confirmation-btn").addEventListener("click", (e) => {
        updateEmployee(formData, e.target)
    })

})

async function updateEmployee(formData, updateBtn) {
    try {
        updateBtn.innerHTML = "Updating..."
        const response = await fetch(`/employees/update/${formData._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        responseDecider(updateBtn, data, formData)
    } catch (error) {
        toast("Error making update request", "danger")
        updateBtn.innerHTML = "Confirm"
    }
}

function responseDecider(updateBtn, response) {
    if ((response.status) == true) {
        toast(response.message, "success")
        setTimeout(() => {
            window.location.href = `/employees/${response.data[0].firstName} ${response.data[0].lastName}`
        }, 2000)
        return
    }
    toast(response.message, "danger")
    updateBtn.innerHTML = "Confirm"

}