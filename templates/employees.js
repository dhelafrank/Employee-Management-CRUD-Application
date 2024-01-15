const employeesClass = require('../controllers/employees')
const cardGenerator = require("../utils/htmCardGenerator")
const employees = new employeesClass()
const nameSplitter = require("../utils/nameSplitter")

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
    quickActionBtn(){
        return `<a href="/employees/new" class="btn primary-btn">New Employee</a>`
    }
    async individualContents(name) {
        console.log(name);
        const nameObject = nameSplitter(name)
        return `${await individualContentDecider(nameObject)}`
    }
}

async function mainContents(){
    await employees.all((responseData) => {allEmployees = responseData.data})
    return await cardGenerator("employee-card", allEmployees)

}
async function individualContentDecider(nameObject) {
    const employeeFetched = await employees.view(nameObject, ()=>{})
    if (employeeFetched && employeeFetched.length > 0) {
        return `${JSON.stringify(employeeFetched)}`
    }
    return `<h2>Employee Does not Exist</h2>`
}

const employeesTemp = new employeesTemplate()

module.exports = employeesTemp