const employeesClass = require('../controllers/employees')
const departmentsClass = require('../controllers/departments')

const employees = new employeesClass()
const departments = new departmentsClass()


const cardGenerator = require("./components/htmlCardGenerator")
const nameSplitter = require("../utils/nameSplitter")
const {
    timeFormmater
} = require("../utils/timestampConverter")

class employeesTemplate {
    menu() {
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li class="active"><a href="/employees">Employees</a></li>
                    <li><a href="/departments">Departments</a></li>
                </ul>`
    }
    async contents() {
        return `
        <ul>
            ${await mainContents()}
        <ul>
        
        <script>
        document.querySelectorAll(".employee-card").forEach(card => {
            card.addEventListener("click", (e) => {
                let employeeName = card.querySelector(".name").innerHTML
                window.location.href = \`/employees/\${employeeName}\`
            })
        })
        </script>
        `
    }

    quickActionBtn() {
        return `<a href="/employees/new" class="btn primary-btn">New Employee</a>`
    }

    async individualContents(name) {
        const nameObject = nameSplitter(name)
        let contentReturned = await individualContentDecider(nameObject)
        return contentReturned
    }
    async newEmployee() {
        return await newEmployeeGenerator()
    }
}









async function mainContents() {
    await employees.all((responseData) => {
        allEmployees = responseData.data
    })
    return await cardGenerator("employee-card", allEmployees)

}

async function individualContentDecider(nameObject) {
    var ejsObject = {
        screenTitle: "Employees",
        contents: `<h2>Employee Does not Exist</h2>`
    }
    const employeeFetched = await employees.view(nameObject, () => {})
    if (employeeFetched.length > 0) {
        ejsObject.screenTitle = `${employeeFetched[0].firstName} ${employeeFetched[0].otherNames} ${employeeFetched[0].lastName}`
        ejsObject.contents = await employeeHTMLGenerator(employeeFetched[0])
        return ejsObject
    }
    return ejsObject
}


async function employeeHTMLGenerator(employee) {
    let employeeDepartments = employee.departments
    async function departmentComponent(departmentArray) {
        let listElement = '';

        for (const index of departmentArray) {
            const departmentGotten = await departments.departmentByIndex(index);
            let departmentElement = `<li class="departments-list">${departmentGotten.name}</li>`;
            listElement += departmentElement;
        }

        return `
        <ul class="info-content">
            ${listElement}
        </ul>
        `
    }

    return `<div class="employee-information-container">
                <div class="section-one">
                    <p class="info-heading">Departments</p>
                        ${await departmentComponent(employeeDepartments)}
                </div>
                <div class="section-two">
                    <div>
                        <p class="info-heading">Date of Birth</p>
                        <span class="info-content">${timeFormmater(employee.dateOfBirth)}</span>
                    </div>

                    <div>
                        <p class="info-heading">Date of Employment</p>
                        <span class="info-content">${timeFormmater(employee.dateOfEmployment)}</span>
                    </div>
                </div>
            </div>
            <div class="action-btn-container">
                <button class="btn primary-btn edit-employee-btn" employee-id="${employee._id}">Edit Employee  <i class="fa-solid fa-pencil"></i></button>
                <button class="btn negative-btn delete-employee-btn" employee-id="${employee._id}" employee-name="${employee.firstName}">Delete Employee  <i class="fa-solid fa-trash-can"></i></button>
            </div>
            <script src="/javascripts/individualEmployee.js" type="module"></script>
            `
}


async function newEmployeeGenerator() {
    return `<form class="new-employee-container" id="new-employee-form">
                <div class="section">
                    <p class="info-heading">Personal Information</p>
                    <label>New Employee Name</label>
                    <input type="text" placeholder="First Name" id="first-name" required>
                    <input type="text" placeholder="Last Name" id="last-name" required>
                    <label for="dob">Date of Birth</label>
                    <div>
                        <input type="date" id="dob" required>
                    </div>
                </div>

                <div class="section">
                    <p class="info-heading">Organization Information</p>
                    <label for="doe">Date of Employment</label>
                    <div>
                        <input type="date" id="doe" required>
                    </div>
                    <label>Departments</label>
                    <div id="employee-departments-container">
                        <!-- <span class="departments-tag" department-id="1">Paediatric <i class="fa-solid fa-xmark remove-tag"></i></span>
                        <span class="departments-tag" department-id="2">Accident and Emergency <i class="fa-solid fa-xmark remove-tag"></i></span> -->
                        <select id="tag-options">
                            <option value="0">Add Department</option>
                        </select>
                    </div>
                    <button class="btn primary-btn new-employee-btn">Create Employee</button> 
                </div>
            </form>
            <script src="/javascripts/newEmployee.js" type="module"></script>
            `
}

const employeesTemp = new employeesTemplate()

module.exports = employeesTemp