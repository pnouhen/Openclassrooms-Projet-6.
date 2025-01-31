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
const filter = document.getElementById("projetsFilter");
async function filterFunction() {
  // Placer les catégories dans un tableau
  let categories = [];
  // Récuperation du tableau
  const filterTableau = await apiWorks();
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
  return categories;
}
filterFunction();
//  Fonction pour enlever les classes des autres bouttons
function buttonRemove() {
  const filter = document.getElementById("projetsFilter");
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
  filter.classList.toggle("active")
  // Loginout
  const loginLink = document.querySelector('a[href="login.html"]');
  const loginItem = loginLink.parentElement;
  loginItem.textContent = "logout";
  loginItem.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    loginItem.innerHTML = '<a href="login.html">Login</a>';
    headerEdition.classList.remove("active");
    filter.classList.remove("active")
  });
  // Remplir la modalPicture
  const modeEdition = document.querySelector(".headerEdition");
  const modalPicture = document.querySelector(".modalPicture");
  const modalPictureImg = document.getElementById("modalPictureImg");
  // Open the modalPicture
  modeEdition.addEventListener("click", async () => {
    modalPicture.classList.toggle("active");
    modalPictureImg.innerHTML = "";
    await projet(modalPictureImg);
    // Mise en place de la poubelle
    const modalPictureFigures = document.querySelectorAll(
      "#modalPictureImg figure"
    );
    modalPictureFigures.forEach((figure) => {
      const trash = document.createElement("i");
      figure.appendChild(trash);
      trash.classList.add("fa-solid", "fa-trash-can");
      figure.style.position = "relative";
    });
  });
}
// Close the modalPicture
const modalPictureOverlay = document.querySelector(".modalPictureOverlay");
const modalPictureXmark = document.getElementById("modalPictureXmark");
const modalPicture = document.querySelector(".modalPicture");
modalPicture.addEventListener("click", (e) => {
  if (e.target === modalPictureOverlay || e.target === modalPictureXmark) {
    modalPicture.classList.toggle("active");
  }
});
//Open the modalAdd
const modalAdd = document.querySelector(".modalAdd");
const modalPictureAdd = document.querySelector(".modalPictureAdd");
const imagePreview = document.querySelector(".modalAddPictureAdd img");
const buttonValidate = document.querySelector(".modalAddPictureAddValidate");
buttonValidate.classList.remove("active");

modalPictureAdd.addEventListener("click", () => {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
  buttonValidate.classList.toggle("active");
  imagePreview.classList.toggle("active");
});
// Close the modalAdd
const modalAddFormulaire = document.querySelector(".modalAddFormulaire");
const modalAddOverlay = document.querySelector(".modalAddOverlay");
const modalAddXmark = document.getElementById("modalAddXmark");
const fArrowLeft = document.querySelector(".fa-arrow-left");
modalAdd.addEventListener("click", (e) => {
  if (
    e.target === modalAddOverlay ||
    e.target === modalAddXmark ||
    e.target === fArrowLeft
  ) {
    modalAdd.classList.toggle("active");
    modalPicture.classList.toggle("active");
    modalAddFormulaire.reset();
    // For modalAddPictureAdd reset
    imagePreview.src = "";
    icon.classList.remove("active");
    label.classList.remove("active");
    uploadField.classList.remove("active");
    message.classList.remove("active");
    imagePreview.classList.remove("active");
  }
});
// Preview uploadField
const uploadField = document.getElementById("file");
const icon = document.querySelector(".modalAddPictureAdd i");
const label = document.querySelector(".modalAddPictureAdd label[for='file']");
const message = document.querySelector(".modalAddPictureAdd p");
function modalAddPictureAddFill(){
  imagePreview.classList.toggle("active");
    icon.classList.toggle("active");
    label.classList.toggle("active");
    uploadField.classList.toggle("active");
    message.classList.toggle("active");
}
uploadField.addEventListener("change",() => {
  const file = uploadField.files[0];
  if (file && file.size <= 4 * 1024 * 1024) {
    let reader = new FileReader();
    reader.readAsDataURL(uploadField.files[0]);
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    modalAddPictureAddFill()
  } else {
     alert("Le fichier est trop grand, il dépasse 4 Mo.");
    this.value = "";
  } 
  });
// Add categories in select
const selectCategories = document.getElementById("categorie");
async function addCategories() {
  // Reprise du code pour créer les filtres
  let categories = [""];
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = "";
  selectCategories.prepend(firstOption);
  document.getElementById("categorie").selectedIndex = 0;
  const categorieTableau = await apiWorks();
  for (let i = 0; i < categorieTableau.length; i++) {
    const categoryName = categorieTableau[i].category.name;
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      selectCategories.appendChild(option);
    }
  }
  selectCategories.selectedIndex = 0;
}
addCategories();
// Button Validation
// Change color
const title = document.getElementById("title");
function checkform() {
  if (
    title.value.trim() !== "" &&
    selectCategories.value.trim() !== "" &&
    uploadField.files.length
  ) {
    buttonValidate.classList.remove("active");
  } else {
    buttonValidate.classList.add("active");
  }
}
title.addEventListener("input", checkform);
selectCategories.addEventListener("change", checkform);
uploadField.addEventListener("change", checkform);
// Reset
buttonValidate.addEventListener("click", () =>{
  title.value = ""
  console.log(title.value)
    selectCategories.value = ""
    uploadField.value = ""
    imagePreview.src = ""
    modalAddPictureAddFill()
})

// A faire
// Validation que quand c'est vert et fermer la modale