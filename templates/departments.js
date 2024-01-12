class departmentsTemplate{
    menu(){
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li><a href="/employees">Employees</a></li>
                    <li class="active"><a href="/departments">Departments</a></li>
                </ul>`
    }
}
const departmentsTemp = new departmentsTemplate()

module.exports = departmentsTemp