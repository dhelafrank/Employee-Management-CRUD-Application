import {
    init,
    employeeDepartments
} from "./component/departmentsTag.js"
import {
    toast
} from "./component/toast.js"

try {
    let departmentsResponse = await fetch('/departments/all').then(res => res.json())   
    init(await departmentsResponse.data)
} catch (error) {
    console.log(error);
}

let newEmployeeForm = document.getElementById("new-employee-form")
newEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let firstName = document.getElementById("first-name").value
    let otherNames = ""
    let lastName = document.getElementById("last-name").value
    let dateOfBirth = createTimestamp(document.getElementById("dob").value)
    let dateOfEmployment = createTimestamp(document.getElementById("doe").value)
    let departments = employeeDepartments.sort()

    const formData = {
        firstName,
        otherNames,
        lastName,
        dateOfBirth,
        dateOfEmployment,
        departments
    }

    // alert(JSON.stringify(formData))
    createEmployee(formData)

})

function createTimestamp(date) {
    const dateObject = date.split("-")
    const timestamped = new Date(dateObject[0], dateObject[1] - 1, dateObject[2]).getTime()
    return timestamped
}

async function createEmployee(formData) {
    const submitBtn = document.querySelector(".new-employee-btn")
    submitBtn.innerHTML = "Creating..."
    const response = await fetch('/employees/new', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json()
    responseDecider(submitBtn, data)
}

function responseDecider(submitBtn, response) {
    if ((response.status) == true) {
        toast(response.message, "success")
        setTimeout(() => {
            window.location.href = `/employees/${response.data[0]}`
        }, 2000)
        submitBtn.innerHTML = "Create Employee"
        return
    }
    toast(response.message, "danger")
    submitBtn.innerHTML = "Create Employee"

}