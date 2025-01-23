// Authentification de l’utilisateur
const formConnexion = document.getElementById("formConnexion");

formConnexion.addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const login = {
    email: event.target.querySelector("[name=email]").value, 
    mdp: event.target.querySelector("[name=mdp]").value, 
  };
  // Transformer l'objet JavaScript login en une chaîne de caractères au format JSON
  const chargeUtile = JSON.stringify(login);
  // Appel du fetch
    const replogin = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });
// const reploginData = await replogin.json()
  console.log(replogin.ok)
});
