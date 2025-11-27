const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const registerLink = document.getElementById("registerLink");
const backToLogin = document.getElementById("backToLogin");

if (registerLink) {
  registerLink.onclick = () => {
    document.querySelector(".login-container").classList.add("hidden");
    document.querySelector(".register-container").classList.remove("hidden");
  };
}

if (backToLogin) {
  backToLogin.onclick = () => {
    document.querySelector(".register-container").classList.add("hidden");
    document.querySelector(".login-container").classList.remove("hidden");
  };
}

if (registerBtn) {
  registerBtn.onclick = () => {
    const email = document.getElementById("newEmail").value;
    const pass = document.getElementById("newPassword").value;

    if (email && pass) {
      localStorage.setItem(email, pass);
      alert("Usuario registrado correctamente");

      document.querySelector(".register-container").classList.add("hidden");
      document.querySelector(".login-container").classList.remove("hidden");
    } else {
      alert("Completa los campos por favor");
    }
  };
}

if (loginBtn) {
  loginBtn.onclick = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (localStorage.getItem(email) === pass) {
      alert(`Acceso permitido. Se mandó una alerta a ${email}`);
      window.location.href = "main.html"; // tu juego
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };
}
