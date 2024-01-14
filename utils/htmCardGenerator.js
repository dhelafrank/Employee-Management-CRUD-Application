function cardGenerator(cardClassName, inputObject) {
    let htmlContent = ``
    let htmlTemplate = (data) => {
        return `
                 <li class="${cardClassName}">
                     <div>
                         <p class="name">${data.firstName || data.name} ${data.lastName || ""}</p>
                         <p>${data.departments ||`No. of Employees: ${data.noOfEmployees}`}</p>
                     </div>
                 </li>
                `
    }

    inputObject.forEach(object => {
        htmlContent += htmlTemplate(object)
    })
    return htmlContent
}

module.exports = cardGenerator