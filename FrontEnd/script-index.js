// Faire le lien avec l'API/works
async function apiWorks() {
  const tableauWorks = await fetch("http://localhost:5678/api/works");
  const tableauWorksJson = await tableauWorks.json();
  return tableauWorksJson;
}
// Association de la div
const gallery = document.getElementById("gallery");
// Function for fill the gallery
function galleryFill(fill){
  // Figure in Gallery
  const figure = document.createElement("figure");
  gallery.appendChild(figure);
  // Image
  const img = document.createElement("img");
  figure.appendChild(img);
  img.src = fill[i].imageUrl;
  // Title
  const figcaption = document.createElement("figcaption");
  figure.appendChild(figcaption);
  figcaption.innerText = fill[i].title;
}
//  Récupération des travaux depuis le back-end
async function projet() {
  const projetTableau = await apiWorks();
  
  for (i = 0; i < projetTableau.length; i++) {
galleryFill(projetTableau)
  }
}
projet();
// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie
// Création de portfolio
const portfolio = document.getElementById("portfolio");
portfolio.appendChild(gallery);
// Création et mise en place de la div
const filter = document.createElement("div");
filter.classList.add('portfolioFilter')
portfolio.appendChild(filter);
portfolio.insertBefore(filter, gallery);
// Création des buttons
async function filterFunction() {
  // Récuperation du tableau
  const filterTableau = await apiWorks();
  // Placer les catégories dans un tableau
  let categories = ["Tous"];
  for (let i = 0; i < filterTableau.length; i++) {
    const categoryName = filterTableau[i].category.name;
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
    }
  }
  // Afficher les catégories du tableau
  for (i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    filter.appendChild(button);
    button.textContent = categories[i];
 
  button.addEventListener("click", () => {
    gallery.innerHTML="";
    if(button.textContent === 'Tous'){
    projet()
    } else {
      for (i = 0; i < filterTableau.length; i++) {
        if(filterTableau[i].category.name === button.textContent){
          galleryFill(filterTableau)
    }}} 
})
}
}
filterFunction();

