// Authentification de l’utilisateur
const formConnexion = document.getElementById("formConnexion");

formConnexion.addEventListener("submit", async function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const login = {
    email: document.getElementById("email").value,
    password: document.getElementById("mdp").value,
  };
  // Transformer l'objet JavaScript login en une chaîne de caractères au format JSON
  // Appel du fetch
  const replogin = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });
  const reploginData = await replogin.json();
  console.log(replogin);
  // Boucle pour la connexion
  if (replogin.status === 200) {
    localStorage.setItem("authToken", reploginData.token);
    window.location.href = "./index.html";
  } else {
    const errorMessage = document.querySelector("#formulaire p")
    errorMessage.classList.add("active")
  }
});
