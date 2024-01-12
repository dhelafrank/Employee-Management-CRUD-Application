const userLogin = async formData => {
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    userLogin(formData)
})