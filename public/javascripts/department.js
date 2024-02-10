import {
    toast
} from "./component/toast.js"

export async function createNewDepartment(btn, departmentName){
    let btnFirstState = btn.innerHTML
    btn.innerHTML = "Creating..."
try {
    const response = await fetch('/departments/new', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({departmentName})
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