// Call the API
let works = [];
async function apiWorks() {
  if (works.length === 0) {
    const tableauWorks = await fetch("http://localhost:5678/api/works");
    works = await tableauWorks.json();
  }
  return works;
}
// Function for fill the gallery
const gallery = document.getElementById("gallery");
function galleryFill(gallery, fill) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  gallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.id = fill.id;
  figcaption.innerText = fill.title;
  img.src = fill.imageUrl;
}
//  Integrate the back-end into the gallery
async function projet(gallery) {
  const projetTableau = await apiWorks();
  projetTableau.forEach((item) => {
    galleryFill(gallery, item);
  });
}
projet(gallery);
// Filter button with a table
const filter = document.getElementById("projetsFilter");
//  Function remove class buttons and gallery
function buttonRemoveAll() {
  gallery.innerHTML = "";
  projet(gallery);
}
function buttonBackgroundColor(){
  const buttons = filter.querySelectorAll("button");
  buttons.forEach((b) => b.classList.remove("buttonFilter"));
}
async function filterFunction() {
  let categories = [];
  const filterTableau = await apiWorks();
  // Generate buttons without duplicate
  for (let i = 0; i < filterTableau.length; i++) {
    const categoryName = filterTableau[i].category.name;
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
      const button = document.createElement("button");
      button.classList.add("buttonTableau");
      button.textContent = categoryName;
      filter.appendChild(button);
      // Activation buttons into the table
      button.addEventListener("click", () => {
        gallery.innerHTML = "";
        buttonBackgroundColor();
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
// Activation button : Tous
const buttonTous = document.getElementById("buttonTous");
buttonTous.addEventListener("click", () => {
  buttonRemoveAll()
  buttonBackgroundColor();
  buttonTous.classList.add("buttonFilter");
});
// Add the edition mode
const header = document.getElementById("header");
const headerEdition = document.querySelector(".headerEdition");
const modeEdition = document.querySelector("#modifier div");
const modalPicture = document.querySelector(".modalPicture");
const modalPictureImg = document.getElementById("modalPictureImg");
// Tocken
const token = sessionStorage.getItem("authToken");
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
    sessionStorage.removeItem("authToken");
    loginItem.innerHTML = '<a href="login.html">Login</a>';
    headerEdition.classList.remove("active");
    modeEdition.classList.remove("active");
    filter.classList.remove("active");
    headerNormal.style.paddingTop = "";
  });
}
// Open the modalPicture
async function openModalPicures() {
  modalPictureImg.innerHTML = "";
  await projet(modalPictureImg);
  const modalPF = document.querySelectorAll("#modalPictureImg figure");
  // Create trash
  let i = 1;
  modalPF.forEach((figure) => {
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
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );

        // Remove element in the modale
        figure.remove();
        // Search and Remove the same element in the gallery
        const galleryFigure = document.querySelector(
          `#gallery figure[id="${figureId}"]`
        );
        if (galleryFigure) {
          galleryFigure.remove();
        }
      } catch (error) {
        alert("Erreur réseau ou autre problème", error);
      }
    });
  });
}
modeEdition.addEventListener("click", async () => {
  modalPicture.classList.toggle("active");
  openModalPicures();
});
// Close the modalPicture
const modalPictureXmark = document.getElementById("modalPictureXmark");
modalPicture.addEventListener("click", (e) => {
  if (e.target === modalPicture || e.target === modalPictureXmark) {
    modalPicture.classList.toggle("active");
  }
});
//Open the modalAdd
const modalPictureAdd = document.querySelector(".modalPictureAdd");
const modalAdd = document.querySelector(".modalAdd");
const buttonValidate = document.querySelector(".modalAddPictureAddValidate");
// Div for add picture
const uploadField = document.getElementById("file");
const imagePreview = document.querySelector(".modalAddPictureAdd img");
const icon = document.querySelector(".modalAddPictureAdd i");
const label = document.querySelector(".modalAddPictureAdd label[for='file']");
const text = document.querySelector(".modalAddPictureAdd p");

modalPictureAdd.addEventListener("click", () => {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
  buttonValidate.classList.toggle("active");
  imagePreview.classList.remove("active");
  icon.classList.remove("active");
  label.classList.remove("active");
  text.classList.remove("active");
  uploadField.value = "";
  imagePreview.src = "";
  title.value = "";
  selectCategories.value = "";
});
// Preview image
function removeImage(){
  uploadField.value = ""; 
  imagePreview.src = "";
}
uploadField.addEventListener("change", () => {
  const file = uploadField.files[0];
  // Check type and size file
  if (file && file.size > 4 * 1024 * 1024) {
    alert("Le fichier est trop grand, il dépasse 4 Mo.");
    removeImage()
    return;
  }
  const typesValides = ["image/jpeg", "image/png"];
  if (file && !typesValides.includes(file.type)) {
    alert("Seuls les fichiers JPG et PNG sont autorisés.");
    removeImage()
    return;
  }
  // Generate good file
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imagePreview.classList.add("active");
    icon.classList.toggle("active");
    label.classList.toggle("active");
    text.classList.toggle("active");
  };
});
// Add categories in select
const selectCategories = document.getElementById("categorie");
async function addCategories() {
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = "";
  selectCategories.prepend(firstOption);
  document.getElementById("categorie").selectedIndex = 0;
  let categories = [""];
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
function modalAddClose() {
  modalAdd.classList.toggle("active");
  modalPicture.classList.toggle("active");
}
buttonValidate.addEventListener("click", async function () {
  if (checkform()) {
    // Create for connexion with API
    const formData = new FormData();
    formData.append("image", uploadField.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectCategories.value);
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      // If answer is false, we try to read in JSON
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Erreur HTTP ! Statut : ${
            response.status
          }, Détails : ${JSON.stringify(errorDetails)}`
        );
      }
      // Answer is true
      alert("Le formulaire est correctement envoyé");
      buttonRemoveAll()
      openModalPicures()
      modalAddClose()
    } catch (erreur) {
      alert("Les champs ne sont pas remplis correctement : " + erreur);
    }
  } else {
    alert("Tous les champs doivent être remplis");
  }
});
// Close the modalAdd
const modalAddFormulaire = document.querySelector(".modalAddFormulaire");
const modalAddXmark = document.getElementById("modalAddXmark");
const fArrowLeft = document.querySelector(".fa-arrow-left");
const title = document.getElementById("title");
modalAdd.addEventListener("click", (e) => {
  if (
    e.target === modalAdd ||
    e.target === modalAddXmark ||
    e.target === fArrowLeft
  ) {
    modalAddClose();
    if (
      title.value.trim() !== "" &&
      selectCategories.value.trim() !== "" &&
      uploadField.files.length
    ) {
      buttonValidate.classList.remove("active");
    } else {
      buttonValidate.classList.toggle("active");
    }
  }
});
title.addEventListener("input", checkform);
selectCategories.addEventListener("change", checkform);
uploadField.addEventListener("change", checkform);