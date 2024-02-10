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

    async newDepartment() {
        return `
        <form class="new-department-container">
            <input type="text" name="departmentName" placeholder="Enter Name of New Department" required/><br/>
            
            <button type="submit" class="btn primary-btn submit-btn">Create New Department</button>        
        </form>

        <script type="module">
        import {createNewDepartment} from "/javascripts/department.js"
            document.querySelector('.new-department-container').addEventListener('submit',(e)=>{
                e.preventDefault()
                let departmentName = document.querySelector('[name="departmentName"]').value;
                createNewDepartment(document.querySelector(".submit-btn"), departmentName)
            })
        </script>
        `
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