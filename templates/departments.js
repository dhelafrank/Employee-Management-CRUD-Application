const fs = require('fs')
const path = require('path')

const departmentsClass = require('../controllers/departments')
const cardGenerator = require("../utils/htmCardGenerator")
const departments = new departmentsClass()

let allDepartments = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/departments.json"), "utf-8"))

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

    async individualContents() {
        return `${await individualContentDecider()}`
    }

}
async function mainContents() {
    await departments.all((responseData) => {
        allDepartments = responseData.data
    })
    return cardGenerator("department-card", allDepartments)

}

async function individualContentDecider() {
    return `<h2>Department Does not Exist</h2>`
}
const departmentsTemp = new departmentsTemplate()

module.exports = departmentsTemp