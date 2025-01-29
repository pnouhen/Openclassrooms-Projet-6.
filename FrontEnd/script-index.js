let works = [];
// Faire le lien avec l'API/works
async function apiWorks() {
  if (works.length === 0) {
    const tableauWorks = await fetch("http://localhost:5678/api/works");
    works = await tableauWorks.json();
  }
  return works;
}
// Association de la div
const gallery = document.getElementById("gallery");
// Function for fill the gallery
function galleryFill(gallery, fill) {
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
async function projet(gallery) {
  const projetTableau = await apiWorks();
  projetTableau.forEach((item) => {
    galleryFill(gallery, item);
  });
}
projet(gallery);
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
            galleryFill(gallery, filterTableau[i]);
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
  projet(gallery);
  buttonRemove();
  buttonTous.classList.add("buttonFilter");
});

// Ajout de la barre de Edition après avoir le tocken
const token = localStorage.getItem("authToken");
const header = document.getElementById("header");
const headerEdition = document.querySelector(".headerEdition");
if (token) {
  headerEdition.classList.toggle("active");
  // Loginout
  const loginLink = document.querySelector('a[href="login.html"]');
  const loginItem = loginLink.parentElement;
  loginItem.textContent = "logout";
  loginItem.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    loginItem.innerHTML = '<a href="login.html">Login</a>';
    headerEdition.classList.remove("active");
  });
}
// Remplir la modalPicture
const modeEdition = document.querySelector(".headerEdition");
const modalPicture = document.querySelector(".modalPicture");
const modalPictureImg = document.getElementById("modalPictureImg");

// Ouvrir la modalPicture
modeEdition.addEventListener("click", async () => {
  modalPicture.classList.toggle("active");
  modalPictureImg.innerHTML = "";
  await projet(modalPictureImg);
  // Mise en place de la poubelle
  const modalPictureFigures = document.querySelectorAll("#modalPictureImg figure");
  modalPictureFigures.forEach((figure) => {
    const trash = document.createElement("i");
    figure.appendChild(trash);
    trash.classList.add("fa-solid", "fa-trash-can");
    figure.style.position = "relative";
  });
});
// Fonction pour fermer la modalPicture
const modalPictureOverlay = document.querySelector(".modalPictureOverlay");
const faxmark = document.querySelector(".fa-xmark");
modalPicture.addEventListener("click", (e) => {
  if (e.target === modalPictureOverlay || e.target === faxmark) {
    modalPicture.classList.toggle("active");
  }
});
// Add modalAdd
const modalAdd = document.querySelector(".modalAdd")
const modalPictureAdd = document.querySelector(".modalPictureAdd")
console.log(modalPictureAdd)
console.log(modalAdd);

modalPictureAdd.addEventListener("click", () => {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
})