const departmentsClass = require('../../controllers/departments')
const employeesClass = require('../../controllers/employees')
const departments = new departmentsClass()
const employees = new employeesClass()
const cardGenerator = require("./htmlCardGenerator")

const {
    timestampToYYYYMMDD,
    timeFormatter,
    htmlTimeFormat
} = require("../../utils/timestampConverter")

async function individualDepartmentDecider(nameString) {
    var ejsObject = {
        screenTitle: "Departments",
        contents: `<h2>Department does not exist</h2>`
    };
    const departmentFetched = await departments.view({
        name: nameString
    }, () => {});
    if (departmentFetched.length > 0) {
        ejsObject.screenTitle = `${departmentFetched[0].name}`;
        ejsObject.contents = await departmentHTMLGenerator(departmentFetched[0]);
        return ejsObject;
    }
    return ejsObject;
}


async function departmentHTMLGenerator(deptObj) {
    const totalEmployeesPerDepartment = await employees.perDepartment(deptObj._id)

    return `
    <div>
        <p><strong>Created At: </strong> ${timeFormatter(deptObj.createdAt)}</p>
        <p><strong>Total Number of Employees: </strong> ${totalEmployeesPerDepartment.length}</p>
        <ul>
            ${await cardGenerator("employee-card", totalEmployeesPerDepartment)}
        </ul>
    </div>
    <div class="action-btn-container">
        <button class="btn primary-btn edit-department-btn" employee="${deptObj.name}">Edit Department  <i class="fa-solid fa-pencil"></i></button>
        <button class="btn negative-btn delete-department-btn" employee-id="${deptObj._id}" department-name="${deptObj.name}">Delete Department  <i class="fa-solid fa-trash-can"></i></button>
    </div>

    <script type="module">
    import {deleteDepartment} from "/javascripts/department.js"
    document.querySelectorAll(".employee-card").forEach(card => {
        card.addEventListener("click", (e) => {
            let employeeName = card.querySelector(".name").innerHTML;
            window.location.href = \`/employees/\${employeeName}\`;
        });
    });
     document.querySelector(".delete-department-btn").addEventListener("click", (e)=>{
         deleteDepartment((e.target).getAttribute( "department-name"))
     })
    </script>
    `
}

module.exports = {
    individualDepartmentDecider
}