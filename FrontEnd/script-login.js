// Authentification de l’utilisateur
const formConnexion = document.getElementById("formConnexion");

// formConnexion.addEventListener("submit", async function(event) {
//   event.preventDefault(); // Empêche la soumission par défaut du formulaire

//   const login = {
//     email: document.getElementById('email').value,
//     password : document.getElementById('mdp').value
//   };
//   // Transformer l'objet JavaScript login en une chaîne de caractères au format JSON
//   // Appel du fetch
//     const replogin = await fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(login)
//     });
// const reploginData = await replogin.json()
//   console.log(replogin)
//   // Boucle pour la connexion
//   if (replogin.status === 200) {
//     console.log("Connexion etablie");
//     localStorage.setItem('authToken', reploginData.token);
//     const storedToken = localStorage.getItem('authToken');
//     console.log(storedToken);
//   } else if (replogin.status === 401) {
//     console.log("Non autorisé");
//   } else {
//     console.log("Erreur inconnue : " + replogin.status);
//   }
// });
// Ajout de la barre de Edition
// Recuperation des données
// const header = document.getElementById("header");
// const h1 = document.getElementById("h1");
// const nav = document.getElementById("nav")
// // Création de divEdition
// const divEdition = document.createElement("div");
// header.appendChild(divEdition);
// const iconEdition = document.createElement("i")
// divEdition.appendChild(iconEdition)
// iconEdition.classList.add("fa-regular","fa-pen-to-square")
// const pEdition = document.createElement("p");
// divEdition.appendChild(pEdition);
// pEdition.textContent = "Mode édition"
// divEdition.classList.add('headerEdition')
// // Regroupement des balises h1 et nav
// const divH1Nav = document.createElement("div")
// header.appendChild(divH1Nav)
// divH1Nav.appendChild(h1)
// divH1Nav.appendChild(nav)
// divH1Nav.classList.add("divH1Nav")
