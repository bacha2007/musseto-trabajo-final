console.log("SCRIPT CARGADO");
console.log("gameArea =", document.getElementById("gameArea"));

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
      window.location.href = "main.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

function cargarDatoTraducido() {
  const apiInfo = document.getElementById("apiInfo");
  if (!apiInfo) return;

  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(data => {
      const fact = data.text;
      return fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fact)}&langpair=en|es`
      );
    })
    .then(res => res.json())
    .then(translation => {
      apiInfo.textContent = translation.responseData.translatedText;
    })
    .catch(() => {
      apiInfo.textContent = "No se pudo obtener información.";
    });
}


const gameArea = document.getElementById("gameArea");

if (gameArea) {
  let score = 0;
  const scoreEl = document.getElementById("score");

  function spawnCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.top = Math.random() * 270 + "px";
    circle.style.left = Math.random() * 270 + "px";
    gameArea.appendChild(circle);

    circle.onclick = () => {
      score++;
      scoreEl.textContent = score;
      cargarDatoTraducido();
      circle.remove();
    };

    setTimeout(() => circle.remove(), 1000);
  }

  setInterval(spawnCircle, 800);
}

const apiInfoInicial = document.getElementById("apiInfo");
if (apiInfoInicial) {
  cargarDatoTraducido();
}

