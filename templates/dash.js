class dashTemplate {
    menu() {
        return ` <ul>
                    <li class="active"><a href="/dash">Dashboard</a></li>
                    <li><a href="/employees">Employees</a></li>
                    <li><a href="/departments">Departments</a></li>
                </ul>`
    }

    contents() {
        return `
        <h3>Information regarding employees and departments is resetted frequently according to the product document</h3>
        `
    }
}

const dashTemp = new dashTemplate()

module.exports = dashTemp