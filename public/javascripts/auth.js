document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault()
    e.innerHTML = "Logging in"
    let formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    userLogin(formData, e)
})

async function userLogin(formData, e) {
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        authDecision(data)
        e.innerHTML = "Log in"
    } catch (error) {
        console.error(error)
        e.innerHTML = "Log in"
    }
}

async function authDecision(data) {
    if (data.status == false) {
        alert(data.message)
        return
    }
    window.location.href = "/home"
    session.setItem('currentUserInfo', JSON.stringify(data.data))
}