// Authentification de l’utilisateur
const formConnexion = document.getElementById("formConnexion");

formConnexion.addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const login = {
    email: event.target.querySelector("[name=email]").value, 
    mdp: event.target.querySelector("[name=mdp]").value, 
  };

  console.log(login); 
});