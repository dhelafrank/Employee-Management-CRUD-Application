const employeesClass = require('../controllers/employees')
const departmentsClass = require('../controllers/departments')

const employees = new employeesClass()
const departments = new departmentsClass()


const cardGenerator = require("../utils/htmCardGenerator")
const nameSplitter = require("../utils/nameSplitter")
const {timeFormmater} = require("../utils/timestampConverter")

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
        <ul>
            ${listElement}
        </ul>
        `
    }
    return `<div class="employee-information-container">
                <div class="section-one">
                    <p>Departments</p>
                        ${await departmentComponent(employeeDepartments)}
                </div>
                <div class="section-two">
                    <div>
                        <p class="info-heading">Date of Birth</p>
                        <span>${timeFormmater(employee.dateOfBirth)}</span>
                    </div>

                    <div>
                        <p class="info-heading">Date of Employment</p>
                        <span>${timeFormmater(employee.dateOfEmployment)}</span>
                    </div>
            </div>
            </div>`
    // return JSON.stringify(employee)
}
const employeesTemp = new employeesTemplate()

module.exports = employeesTemp