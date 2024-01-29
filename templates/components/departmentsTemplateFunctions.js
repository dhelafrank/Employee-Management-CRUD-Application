const departmentsClass = require('../../controllers/departments')
const departments = new departmentsClass()

async function individualDepartmentDecider(nameString) {
    var ejsObject = {
        screenTitle: "Department",
        contents: `<h2>Department does not exist</h2>`
    };
    const departmentFetched = await departments.view({
        name: nameString
    }, () => {});
    if (departmentFetched.length > 0) {
        ejsObject.screenTitle = `${departmentFetched[0].name}`;
        ejsObject.contents = await departmentHTMLGenerator(departmentFetched[0]);
        return ejsObject;
    }
    return ejsObject;
}


async function departmentHTMLGenerator(deptObj) {
    return `<p>Department Found</p>`
}

module.exports = {
    individualDepartmentDecider
}