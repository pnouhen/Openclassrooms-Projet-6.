// Faire le lien avec l'API/works
async function apiWorks() {
  const tableauWorks = await fetch("http://localhost:5678/api/works");
  const tableauWorksJson = await tableauWorks.json();
  return tableauWorksJson;
}
// Association de la div
const gallery = document.getElementById("gallery");
// Function for fill the gallery

function galleryFill(fill) {
  // Figure in Gallery
  const figure = document.createElement("figure");
  gallery.appendChild(figure);
  // Image
  const img = document.createElement("img");
  img.src = fill.imageUrl;
  figure.appendChild(img);
  // Title
  const figcaption = document.createElement("figcaption");
  figure.appendChild(figcaption);
  figcaption.innerText = fill.title;
}
//  Récupération des travaux depuis le back-end
async function projet() {
  const projetTableau = await apiWorks();
  projetTableau.forEach((item) => {
    galleryFill(item);
  });
}
projet();
// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie
// Création des buttons
const filter = document.getElementById("portfolioFilter");
async function filterFunction() {
  // Récuperation du tableau
  const filterTableau = await apiWorks();
  // Placer les catégories dans un tableau
  let categories = [];
  // Création d'une boucle pour générer les boutons sans doublons et
  // afficher les catégories du tableau
  for (let i = 0; i < filterTableau.length; i++) {
    const categoryName = filterTableau[i].category.name;
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
      const button = document.createElement("button");
      button.classList.add("buttonTableau");
      button.textContent = categoryName;
      filter.appendChild(button);
      // Activation des boutons présent dans le tableau
      button.addEventListener("click", () => {
        gallery.innerHTML = "";
        buttonRemove();
        for (i = 0; i < filterTableau.length; i++) {
          if (filterTableau[i].category.name === button.textContent) {
            galleryFill(filterTableau[i]);
            button.classList.add("buttonFilter");
          }
        }
      });
    }
  }
}
filterFunction();
//  Fonction pour enlever les classes des autres bouttons
function buttonRemove() {
  const filter = document.getElementById("portfolioFilter");
  const buttons = filter.querySelectorAll("button");
  // Prendre tous les bouttons et appliquer la classe
  buttons.forEach((b) => b.classList.remove("buttonFilter"));
}

// Activation du bouton : Tous
const buttonTous = document.getElementById("buttonTous");
buttonTous.addEventListener("click", () => {
  gallery.innerHTML = "";
  projet();
  buttonRemove();
  buttonTous.classList.add("buttonFilter");
});

// Ajout de la barre de Edition après avoir le tocken
const token = localStorage.getItem("authToken");
console.log(token);
if (token) {
  console.log("tocken trouvé");
  // Recuperation des données et des classes
  const header = document.getElementById("header");
  const h1 = document.getElementById("h1");
  const nav = document.getElementById("nav");
  // Création de divEdition
  const divEdition = document.createElement("div");
  header.appendChild(divEdition);
  divEdition.classList.add("headerEdition");
  const iconEdition = document.createElement("i");
  divEdition.appendChild(iconEdition);
  iconEdition.classList.add("fa-regular", "fa-pen-to-square");
  const pEdition = document.createElement("p");
  divEdition.appendChild(pEdition);
  pEdition.textContent = "Mode édition";
  // Regroupement des balises h1 et nav
  const divH1Nav = document.createElement("div");
  header.appendChild(divH1Nav);
  divH1Nav.appendChild(h1);
  divH1Nav.appendChild(nav);
  divH1Nav.classList.add("divH1Nav");
  // Propriétés CSS
  header.style.display = "flex";
  header.style.flexDirection = "column";
  header.style.marginTop = 0;
}
