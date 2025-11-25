//login
// Captura los botones y enlaces del formulario
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const registerLink = document.getElementById("registerLink");
const backToLogin = document.getElementById("backToLogin");

// Cambia de la vista de login a la vista de registro
if (registerLink) {
  registerLink.onclick = () => {
    document.querySelector(".login-container").classList.add("hidden");
    document.querySelector(".register-container").classList.remove("hidden");
  };
}

// Vuelve desde el registro al login
if (backToLogin) {
  backToLogin.onclick = () => {
    document.querySelector(".register-container").classList.add("hidden");
    document.querySelector(".login-container").classList.remove("hidden");
  };
}

// Registro de usuario usando LocalStorage
if (registerBtn) {
  registerBtn.onclick = () => {
    const email = document.getElementById("newEmail").value;
    const pass = document.getElementById("newPassword").value;

    if (email && pass) {
      localStorage.setItem(email, pass);
      alert("Usuario registrado con éxito");

      document.querySelector(".register-container").classList.add("hidden");
      document.querySelector(".login-container").classList.remove("hidden");
    } else {
      alert("Complete todos los campos");
    }
  };
}

// Inicio de sesión verificando datos en LocalStorage
if (loginBtn) {
  loginBtn.onclick = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (localStorage.getItem(email) === pass) {
      alert`(Acceso permitido. Se ha enviado una alerta a ${email};`
      window.location.href = "main.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };
}

//Pagina principal
// Botón para cerrar sesión (solo redirige al index)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

/*funcion para traducir los datos*/
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


//juego dinamico
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

      //Cargar dato cada vez que se hace click en un círculo
      cargarDatoTraducido();

      circle.remove();
    };

    setTimeout(() => circle.remove(), 1000);
  }

  setInterval(spawnCircle, 800);
}

/*cargar un dato al empezar la pag*/
const apiInfoInicial = document.getElementById("apiInfo");
if (apiInfoInicial) {
  cargarDatoTraducido();
}