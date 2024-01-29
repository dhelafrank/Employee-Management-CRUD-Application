const departmentsClass = require('../controllers/departments')
const cardGenerator = require("./components/htmlCardGenerator")
const {
    individualDepartmentDecider
} = require("./components/departmentsTemplateFunctions")

const departments = new departmentsClass()

let allDepartments = ""

class departmentsTemplate {
    menu() {
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li><a href="/employees">Employees</a></li>
                    <li class="active"><a href="/departments">Departments</a></li>
                </ul>`
    }

    async contents() {
        return `
        <ul>
            ${await mainContents()}
        <ul>
        
        <script>
        document.querySelectorAll(".department-card").forEach(card => {
                 card.addEventListener("click", (e) => {
                     let departmentName = card.querySelector(".name").innerHTML
                     window.location.href = \`/departments/\${departmentName}\`
                 })
             })
        </script>
        `
    }

    async individualDepartment(nameString) {
        let contentReturned = await individualDepartmentDecider(nameString);
        return contentReturned;
    }
    quickActionBtn() {
        return `<a href="/departments/new" class="btn primary-btn">New Department</a>`
    }

}
async function mainContents() {
    await departments.all((responseData) => {
        allDepartments = responseData.data
    })
    return await cardGenerator("department-card", allDepartments)

}

const departmentsTemp = new departmentsTemplate()

module.exports = departmentsTemp