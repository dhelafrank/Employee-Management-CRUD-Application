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

    // async function departmentsCheck(data) {

    //     if (data.departments) {
    //         let departmentsText = ""
    //         data.departments.forEach(async departmentIndex => {
    //             await departmentsClass.departmentByIndex(departmentIndex - 1, (department) => {
    //                 departmentsText += `${department.name} `
    //                 console.log(`\n\nDepartment Texts are: ${departmentsText}\n\n`);
    //             })
    //         })
    //         console.log(`\n\n\nDepartment texts to return is ${departmentsText} \n\n\n`);
    //         return departmentsText
    //     }

    //     return `No. of Employees: ${data.noOfEmployees}`
    // }


    // inputObject.forEach(async object => {
    //     htmlContent += await htmlTemplate(object)
    //     console.log(`\n\nHTML Content Compiled is: ${htmlContent}\n\n`);

    // })

    async function departmentsCheck(data) {
        if (data.departments) {
            const departmentPromises = data.departments.map(async departmentIndex => {
                const department = await departmentsClass.departmentByIndex(departmentIndex - 1);
                return department.name
            })
            const departmentNames = await Promise.all(departmentPromises);
            return departmentNames.join(" ")
        }
        return `No. of Employees: ${data.noOfEmployees}`

    }

    for (const object of inputObject) {
        htmlContent += await htmlTemplate(object)
    }

    console.log(`\n\nHTML Content Returned is: ${htmlContent}\n\n`);
    return htmlContent;
}

module.exports = cardGenerator