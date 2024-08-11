function changeDisplayRegister() {
    var reg = document.getElementById("regId");
    reg.style.display = "flex";
    var login = document.getElementById("loginId");
    login.style.display = "none";
}

function changeDisplayLogin() {
    var login = document.getElementById("loginId");
    login.style.display = "flex";
    var reg = document.getElementById("regId");
    reg.style.display = "none";
}
