document.getElementById("login-form").addEventListener("submit", (e) => {
    const loginBtn = document.getElementById("log-in-btn")
    e.preventDefault()
   loginBtn.value = "Logging in..."
    let formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    userLogin(formData, loginBtn)
})

async function userLogin(formData, loginBtn) {
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
    } catch (error) {
        console.error(error)
        loginBtn.value = "Log in"
    }
}

async function authDecision(data) {
    if (data.status == false) {
        alert(data.message)
        return
    }
    window.location.href = data.redirect
    sessionStorage.setItem('currentUserInfo', JSON.stringify(data.data))
}