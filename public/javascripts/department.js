import {
    toast
} from "./component/toast.js"

import {
    modalClass
} from "./component/modal.js"

let modal = new modalClass()
modal.init()

export async function createNewDepartment(btn, departmentName) {
    let btnFirstState = btn.innerHTML
    btn.innerHTML = "Creating..."
    try {
        const response = await fetch('/departments/new', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                departmentName
            })
        })
        const data = await response.json()
        responseDecider(btn, btnFirstState, data)
    } catch (error) {
        toas("Check your internet connection", "danger")
        submitBtn.innerHTML = btnFirstState
    }
}

function responseDecider(submitBtn, btnFirstState, response) {
    if ((response.status) == true) {
        toast(response.message, "success")
        setTimeout(() => {
            window.location.href = `/departments/${response.data[0]}`
        }, 2000)
        submitBtn.innerHTML = btnFirstState
        return
    }
    toast(response.message, "danger")
    submitBtn.innerHTML = btnFirstState
}

export async function deleteDepartment(departmentName) {
    let modalContents = `
    <div>
        <p>Would you want to delete ${departmentName}
        <button class="btn primary-btn departmentEventButton" style="margin-top: 2rem" department-name="${departmentName}">Confirm</button>
    </div>
    `
    // document.querySelector(".departmentEventButton").addEventListener("click", async (e) => {
        // await deleteEvent(e.target, e.target.getAttribute("department-name"))
    // })

    modal.open("Deleting Department", modalContents)
}

async function deleteEvent(btn, departmentName) {
    let departmentFound = false;
    let departmentsResponse = await fetch('/departments/all').then(res => res.json())
    for (const department of departmentsResponse.data) {
        departmentFound = department ? department.name == departmentName : false
    }

    try {
        btn.innerHTML = "Deleting.."
        const response = await fetch("/departments/delete", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id:departmentFound.id
            })
        })
        const data = await response.json()

        if ((data.status) == true) {
            toast(data.message, "success")
            setTimeout(window.location.href = "/departments", 2000)
            return
        }
        toast(data.message, "danger")
    } catch (error) {
        btn.innerHTML = "Confirm"
        toast("An Error occured, request could not be made", "danger")
    }
}