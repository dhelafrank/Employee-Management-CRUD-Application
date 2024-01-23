import {
    toast
} from "./component/toast.js"
import {
    modalClass
} from "./component/modal.js"
const modal = new modalClass()

const deleteBtn = document.querySelector(".delete-employee-btn")
const editBtn = document.querySelector(".edit-employee-btn")
editBtn.addEventListener("click", (e)=>{
    window.location.href=`/employees/edit/${(e.target).getAttribute("employee")}`
})

deleteBtn.addEventListener("click", (e) => {
    modal.open("Employee Deletion Confirmation", `<p>Are you sure you want to delete ${(e.target).getAttribute("employee-name")}?</p>
                        <button class="btn primary-btn" id="final-employee-deletion-confirmation-btn" employee-id="${(e.target).getAttribute("employee-id")}">Confirm</button>`)

    document.getElementById("final-employee-deletion-confirmation-btn").addEventListener("click", (e) => {
        deleteEvent((e.target).getAttribute("employee-id"))
    })
})


async function deleteEvent(id) {
    try {
        const response = await fetch("/employees/delete", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
        const data = await response.json()

        if ((data.status) == true) {
            toast(data.message, "success")
            setTimeout(window.location.href = "/employees", 2000)
            return
        }
        toast(data.message, "danger")
    } catch (error) {
        toast("An Error occured, request could not be made", "danger")
    }
}