const employeesController = require('../controllers/employees')
const employeesClass = new employeesController()

const departmentsController = require('../controllers/departments')
const departmentsClass = new departmentsController()


async function cardGenerator(cardClassName, inputObject) {
    let htmlContent = ``
    let htmlTemplate = async (data) => {
        return `
                 <li class="${cardClassName}">
                     <div>
                         <p class="name">${data.firstName || data.name} ${data.lastName || ""}</p>
                         <p>${await departmentsCheck(data)}</p>
                     </div>
                 </li>
                `
    }

    async function departmentsCheck(data) {
        if (data.departments) {
            const departmentPromises = data.departments.map(async departmentIndex => {
                const department = await departmentsClass.departmentByIndex(departmentIndex);
                return department.name || ""
            })
            const departmentNames = await Promise.all(departmentPromises);
            return departmentNames.join(", ")
        }
        const totalEmployeesPerDepartment = await employeesClass.perDepartment(data._id)
        return `No. of Employees: ${totalEmployeesPerDepartment.length}`

    }

    for (const object of inputObject) {
        htmlContent += await htmlTemplate(object)
    }
    return htmlContent;
}

module.exports = cardGenerator