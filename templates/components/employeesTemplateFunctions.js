const employeesClass = require('../../controllers/employees');
const departmentsClass = require('../../controllers/departments');

const employees = new employeesClass();
const departments = new departmentsClass();

const cardGenerator = require("./htmlCardGenerator");
const { timeFormatter,htmlTimeFormat } = require("../../utils/timestampConverter");

async function mainContents() {
    let allEmployees;
    await employees.all((responseData) => {
        allEmployees = responseData.data;
    });
    return await cardGenerator("employee-card", allEmployees);
}

async function individualEmployeeDecider(nameObject) {
    var ejsObject = {
        screenTitle: "Employees",
        contents: `<h2>Employee Does not Exist</h2>`
    };
    const employeeFetched = await employees.view(nameObject, () => {});
    if (employeeFetched.length > 0) {
        ejsObject.screenTitle = `${employeeFetched[0].firstName} ${employeeFetched[0].otherNames} ${employeeFetched[0].lastName}`;
        ejsObject.contents = await employeeHTMLGenerator(employeeFetched[0]);
        return ejsObject;
    }
    return ejsObject;
}

async function employeeHTMLGenerator(employee) {
    let employeeDepartments = employee.departments;
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
        `;
    }

    return `<div class="employee-information-container">
                <div class="section-one">
                    <p class="info-heading">Departments</p>
                        ${await departmentComponent(employeeDepartments)}
                </div>
                <div class="section-two">
                    <div>
                        <p class="info-heading">Date of Birth</p>
                        <span class="info-content">${timeFormatter(employee.dateOfBirth)}</span>
                    </div>

                    <div>
                        <p class="info-heading">Date of Employment</p>
                        <span class="info-content">${timeFormatter(employee.dateOfEmployment)}</span>
                    </div>
                </div>
            </div>
            <div class="action-btn-container">
                <button class="btn primary-btn edit-employee-btn" employee="${employee.firstName} ${employee.lastName}">Edit Employee  <i class="fa-solid fa-pencil"></i></button>
                <button class="btn negative-btn delete-employee-btn" employee-id="${employee._id}" employee-name="${employee.firstName}">Delete Employee  <i class="fa-solid fa-trash-can"></i></button>
            </div>
            <script src="/javascripts/individualEmployee.js" type="module"></script>
            `;
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
                        <select id="tag-options">
                            <option value="0">Add Department</option>
                        </select>
                    </div>
                    <button class="btn primary-btn new-employee-btn">Create Employee</button> 
                </div>
            </form>
            <script src="/javascripts/newEmployee.js" type="module"></script>
            `;
}

async function editEmployeeDecider(nameObject){
    var ejsObject = {
        screenTitle: "Employees",
        contents: `<h2>Employee Does not Exist</h2>`
    };
    const employeeFetched = await employees.view(nameObject, () => {});
    if (employeeFetched.length > 0) {
        ejsObject.screenTitle = `Edit: ${employeeFetched[0].firstName} ${employeeFetched[0].otherNames} ${employeeFetched[0].lastName}`;
        ejsObject.contents = await editEmployeeGenerator(employeeFetched[0]);
        return ejsObject;
    }
    return ejsObject;
}

function editEmployeeGenerator(existingEmployee){
    return `<form class="new-employee-container" id="update-employee-form">
    <div class="section">
        <p class="info-heading">Personal Information</p>
        <label>Update Employee Name</label>
        <input type="text" placeholder="First Name" id="first-name" value="${existingEmployee.firstName}" required>
        <input type="text" placeholder="Last Name" id="last-name" value="${existingEmployee.lastName}" required>
        <label for="dob">Date of Birth</label>
        <div>
            <input type="date" id="dob" value="${htmlTimeFormat(existingEmployee.dateOfBirth)}" required>
        </div>
    </div>

    <div class="section">
        <p class="info-heading">Organization Information</p>
        <label for="doe">Date of Employment</label>
        <div>
            <input type="date" id="doe" value="${htmlTimeFormat(existingEmployee.dateOfEmployment)}" required>
        </div>
        <label>Departments</label>
        <div id="employee-departments-container">
            <!-- <span class="departments-tag" department-id="1">Paediatric <i class="fa-solid fa-xmark remove-tag"></i></span>
            <span class="departments-tag" department-id="2">Accident and Emergency <i class="fa-solid fa-xmark remove-tag"></i></span> -->
            <select id="tag-options">
                <option value="0">Add Department</option>
            </select>
        </div>
                    <button class="btn primary-btn update-employee-btn" employee-id="${existingEmployee._id}">Update</button> 
                </div>
            </form>
            <script src="/javascripts/updateEmployee.js" type="module"></script>
            `;
}

module.exports = {
    mainContents,
    individualEmployeeDecider,
    editEmployeeDecider,
    newEmployeeGenerator
};
