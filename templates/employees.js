class employeesTemplate{
    menu(){
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li class="active"><a href="/employees">Employees</a></li>
                    <li><a href="/departments">Departments</a></li>
                </ul>`
    }
}
const employeesTemp = new employeesTemplate()

module.exports = employeesTemp