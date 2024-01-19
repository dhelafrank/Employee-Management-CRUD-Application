const employeeDepartments = []
var departmentLists
export function init(departmentstFetched) {
    departmentLists = departmentstFetched
    let tagOptions = document.getElementById("tag-options")

    document.getElementById("tag-options").addEventListener('change', (e) => {
        addDepartment(e)
    })
    createTagOptions(departmentLists, tagOptions)
    processTagEvent()
}

function processTagEvent() {
    //Remove tag when x icon is clicked
    let tagRemovalIcons = document.querySelectorAll(".remove-tag")
    tagRemovalIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation()
            let tagSpan = e.target.parentElement
            removeDepartment(tagSpan.getAttribute("department-id"), tagSpan.innerHTML)
            tagSpan.remove()
        })
    })
}

function createTagOptions(tagArray, optionsContainer) {
    for (const tag of tagArray) {
        let tagOption = `<option class="department-options" value=${tag._id}>${tag.name}</option>`
        optionsContainer.insertAdjacentHTML("beforeend", tagOption)
    }
    console.log(employeeDepartments);
}

function createDepartmentElement(department) {
    let tagContainer = document.getElementById("employee-departments-container")
    let element = `<span class="departments-tag" department-id=${department._id}>${department.name} <i class="fa-solid fa-xmark remove-tag"></i></span>`
    tagContainer.insertAdjacentHTML("afterbegin", element)
}

function removeDepartment(value, name) {
    let index = employeeDepartments.indexOf(value)
    employeeDepartments.splice(index, 1)
    console.log(employeeDepartments);
    createTagOptions([{
        _id: value,
        name
    }], document.getElementById("tag-options"))
}

function addDepartment(e) {
    let departmentId = e.target.value
    employeeDepartments.push(departmentId)

    let department
    for (const departmentGotten of departmentLists) {
        if (departmentGotten._id == departmentId) {
            department = departmentGotten
        }
    }

    document.querySelectorAll(".department-options").forEach(tag => {
        if ((tag.getAttribute("value")) == departmentId) {
            tag.remove()
        }
    })
    console.log(employeeDepartments)
    createDepartmentElement(department)
    processTagEvent()
}