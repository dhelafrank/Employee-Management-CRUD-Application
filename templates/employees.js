const cardGenerator = require("./components/htmlCardGenerator");
const nameSplitter = require("../utils/nameSplitter");
const { mainContents, individualEmployeeDecider, editEmployeeDecider, newEmployeeGenerator } = require("./components/employeesTemplateFunctions");

class EmployeesTemplate {
    menu() {
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li class="active"><a href="/employees">Employees</a></li>
                    <li><a href="/departments">Departments</a></li>
                </ul>`;
    }

    async contents() {
        return `
        <ul>
            ${await mainContents()}
        <ul>
        
        <script>
        document.querySelectorAll(".employee-card").forEach(card => {
            card.addEventListener("click", (e) => {
                let employeeName = card.querySelector(".name").innerHTML;
                window.location.href = \`/employees/\${employeeName}\`;
            });
        });
        </script>`;
    }

    quickActionBtn() {
        return `<a href="/employees/new" class="btn primary-btn">New Employee</a>`;
    }

    async individualEmployee(nameString) {
        const nameObject = nameSplitter(nameString);
        let contentReturned = await individualEmployeeDecider(nameObject);
        return contentReturned;
    }

    async editEmployee(nameString){
        const nameObject = nameSplitter(nameString);
        let contentReturned = await editEmployeeDecider(nameObject);
        return contentReturned;
    }

    async newEmployee() {
        return await newEmployeeGenerator();
    }
}

const employeesTemp = new EmployeesTemplate();

module.exports = employeesTemp;
