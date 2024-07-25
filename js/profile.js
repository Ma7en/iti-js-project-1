document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("profile").innerHTML = `
            <h2>Welcome, ${user.firstName}</h2>
            <button id="logout">Logout</button>
        `;

        document
            .getElementById("logout")
            .addEventListener("click", function () {
                localStorage.removeItem("user");
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
});
