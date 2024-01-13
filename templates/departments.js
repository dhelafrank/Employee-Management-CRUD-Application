class departmentsTemplate {
    menu() {
        return ` <ul>
                    <li><a href="/dash">Dashboard</a></li>
                    <li><a href="/employees">Employees</a></li>
                    <li class="active"><a href="/departments">Departments</a></li>
                </ul>`
    }

    contents() {
        return `
        <h3>No Information Found</h3>`
    }

    async individualContents() {
        return `${await individualContentDecider()}`
    }
    
}

async function individualContentDecider() {
    return `<h2>Department Does not Exist</h2>`
}
const departmentsTemp = new departmentsTemplate()

module.exports = departmentsTemp