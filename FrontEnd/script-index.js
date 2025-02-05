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
function galleryFill(gallery, fill, i) {
  // Figure in Gallery
  const figure = document.createElement("figure");
  figure.id = works[i].id;
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
  let i = 0;
  const projetTableau = await apiWorks();
  projetTableau.forEach((item) => {
    galleryFill(gallery, item, i);
    i++;
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
const modeEdition = document.querySelector("#modifier div");
const modalPicture = document.querySelector(".modalPicture");
const modalPictureImg = document.getElementById("modalPictureImg");
if (token) {
  headerEdition.classList.toggle("active");
  modeEdition.classList.toggle("active");
  filter.classList.toggle("active");
  headerNormal = document.querySelector(".headerNormal");
  headerNormal.style.paddingTop = "50px";
  // Loginout
  const loginLink = document.querySelector('a[href="login.html"]');
  const loginItem = loginLink.parentElement;
  loginItem.textContent = "logout";
  loginItem.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    loginItem.innerHTML = '<a href="login.html">Login</a>';
    headerEdition.classList.remove("active");
    modeEdition.classList.remove("active");
    filter.classList.remove("active");
    headerNormal.style.paddingTop = "";
  });
  // Open the modalPicture
  modeEdition.addEventListener("click", async () => {
    modalPicture.classList.toggle("active");
    modalPictureImg.innerHTML = "";
    await projet(modalPictureImg);
    trashes()
  });
}
function trashes() {
  // Récupération des figures dans le modal et dans la galerie
  const modalPictureFigures = document.querySelectorAll(
    "#modalPictureImg figure"
  );
  // Create trash
  let i = 1;
  modalPictureFigures.forEach((figure) => {
    const trash = document.createElement("i");
    figure.appendChild(trash);
    trash.classList.add("fa-solid", "fa-trash-can");
    figure.style.position = "relative";
    trash.id = i;
    i++;
    // Remove figure
    trash.addEventListener("click", async function () {
      const figureId = figure.id;
      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${figureId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (!response.ok) {
          console.log("Erreur lors de la suppression");
        } else {
          // Remove element in the modale
          figure.remove();
          // Search and Remove the same element in the gallery
          const galleryFigure = document.querySelector(
            `#gallery figure[id="${figureId}"]`
          );
          if (galleryFigure) {
            galleryFigure.remove();
          }
        }
      } catch (error) {
        console.log("Erreur réseau ou autre problème", error);
      }
    });
  });
}

// Close the modalPicture
const modalPictureXmark = document.getElementById("modalPictureXmark");
modalPicture.addEventListener("click", (e) => {
  if (e.target === modalPicture || e.target === modalPictureXmark) {
    modalPicture.classList.toggle("active");
  }
});
//Open the modalAdd
const modalAdd = document.querySelector(".modalAdd");
const modalPictureAdd = document.querySelector(".modalPictureAdd");
const imagePreview = document.querySelector(".modalAddPictureAdd img");
const buttonValidate = document.querySelector(".modalAddPictureAddValidate");

modalPictureAdd.addEventListener("click", () => {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
  buttonValidate.classList.toggle("active");
  icon.classList.remove("active")
  label.classList.remove("active")
  message.classList.remove("active")
  imagePreview.classList.remove("active")
  title.value = "";
    selectCategories.value = "";
    uploadField.value = "";
    imagePreview.src = "";
});
// Close the modalAdd
const modalAddFormulaire = document.querySelector(".modalAddFormulaire");
const modalAddXmark = document.getElementById("modalAddXmark");
const fArrowLeft = document.querySelector(".fa-arrow-left");
function modalAddClose() {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
}
modalAdd.addEventListener("click", (e) => {
  if (
    e.target === modalAdd ||
    e.target === modalAddXmark ||
    e.target === fArrowLeft
  ) {
    modalAddClose();
    modalAddFormulaire.reset();
    buttonValidate.classList.toggle("active");
    // For modalAddPictureAdd reset
    imagePreview.src = "";
  }
});
// Preview uploadField
const uploadField = document.getElementById("file");
const icon = document.querySelector(".modalAddPictureAdd i");
const label = document.querySelector(".modalAddPictureAdd label[for='file']");
const message = document.querySelector(".modalAddPictureAdd p");
uploadField.addEventListener("change", () => {
  const file = uploadField.files[0]; 
  
  // Vérification de la taille
  if (file && file.size > 4 * 1024 * 1024) { 
    alert("Le fichier est trop grand, il dépasse 4 Mo.");
    uploadField.value = ""; // Efface la sélection du fichier
    imagePreview.src = ""; // Efface l'image de prévisualisation
    return; // Arrête l'exécution de la fonction
  }

  // Vérification du type de fichier
  const typesValides = ["image/jpeg", "image/png"];
  if (file && !typesValides.includes(file.type)) {
    alert("Seuls les fichiers JPG et PNG sont autorisés.");
    uploadField.value = "";
    imagePreview.src = "";
    return;
  }
  
  // Si le fichier est valide, on peut procéder à la prévisualisation
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imagePreview.classList.add("active");
    icon.classList.toggle("active");
    label.classList.toggle("active");
    message.classList.toggle("active");
  };
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
    const category = categorieTableau[i].category;
    const categoryId = category.id;     
    const categoryName = category.name;
    if (!categories.includes(categoryId)) {
      categories.push(categoryId);
      const option = document.createElement("option");
      option.value = categoryId;
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
    return true;
  }
  buttonValidate.classList.add("active");
  return false;
}
title.addEventListener("input", checkform);
selectCategories.addEventListener("change", checkform);
uploadField.addEventListener("change", checkform);  

buttonValidate.addEventListener("click", async function() {
  if (checkform()) {
    const formData = new FormData();
    formData.append("image", uploadField.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectCategories.value);
    
    // Affichage des données envoyées
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      // Vérification de la réponse
      if (!response.ok) {
        const errorDetails = await response.json();  // Convertir la réponse en JSON
        throw new Error(`Erreur HTTP ! Statut : ${response.status}, Détails : ${JSON.stringify(errorDetails)}`);
      }
alert("Le formulaire est correctement envoyé")
modalAddClose()
modalPictureImg.innerHTML = "";
    await projet(modalPictureImg);
    trashes()
gallery.innerHTML = "";
  projet(gallery);
    }
    catch (erreur) {
      alert("Les champs ne sont pas remplis correctement : " + erreur);
    }
  } else{
      alert("Tous les champs doivent être remplis")
  }
});
// Message d'erreur du bouton