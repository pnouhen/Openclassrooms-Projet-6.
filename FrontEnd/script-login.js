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
    const storedToken = localStorage.getItem("authToken");
    window.location.href = "./index.html";
  } else {
    // Création de la constante pour faire apparaitre le message une fois
    const erreurExistante = document.querySelector(".MessageErreur");
    if (!erreurExistante) {
      // Créer un nouveau message d'erreur
      const erreur = document.createElement("p");
      erreur.classList.add("MessageErreur"); // Ajouter une classe pour styliser l'erreur
      erreur.innerHTML = "Email/Mot de passe incorrect <br> Veuillez réessayer";

      // Ajouter l'erreur au formulaire, avant le champ mot de passe
      const formConnexion = document.getElementById("formConnexion");
      formConnexion.appendChild(erreur);
      const mdpo = document.getElementById("mdpo");
      formConnexion.insertBefore(erreur, mdpo);

      // Modifier la marge si nécessaire
      const connexion = document.getElementById("connexion");
      connexion.style.marginBottom = "0px";
    }
  }
});
