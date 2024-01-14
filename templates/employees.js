const employeesClass = require('../controllers/employees')
const cardGenerator = require("../utils/htmCardGenerator")
const employees = new employeesClass()

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
    async individualContents() {
        return `${await individualContentDecider()}`
    }
}

async function mainContents(){
    await employees.all((responseData) => {allEmployees = responseData.data})
    return cardGenerator("employee-card", allEmployees)

}


// async function employeesCardGenerator() {
//     let htmlContent = ``
//     let htmlTemplate = (data) => {
//         return `
//                  <li class="employee-card">
//                      <div>
//                          <p class="name">${data.firstName} ${data.lastName}</p>
//                          <p class="department">${data.department}</p>
//                      </div>
//                  </li>
//                 `
//     }

//     allEmployees.forEach(employee => {
//         htmlContent += htmlTemplate(employee)
//     })
//     return htmlContent
// }


async function individualContentDecider() {
    return `<h2>Employee Does not Exist</h2>`
}

const employeesTemp = new employeesTemplate()

module.exports = employeesTemp