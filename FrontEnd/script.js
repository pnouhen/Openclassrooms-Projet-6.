// Faire le lien avec l'API/works
async function apiWorks() {
  const tableauWorks = await fetch("http://localhost:5678/api/works");
  const tableauWorksJson = await tableauWorks.json();
  return tableauWorksJson;
}
// Association de la div
const gallery = document.getElementById("gallery");
//  Récupération des travaux depuis le back-end
async function projet() {
  const projetTableau = await apiWorks();
  for (i = 0; i < projetTableau.length; i++) {
    // Figure in Gallery
    const figure = document.createElement("figure");
    gallery.appendChild(figure);
    // Image
    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = projetTableau[i].imageUrl;
    // Title
    const figcaption = document.createElement("figcaption");
    figure.appendChild(figcaption);
    figcaption.innerText = projetTableau[i].title;
  }
}
projet();

// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie
async function filterFunction() 
{
  // Récuperation du tableau
  const filterTableau = await apiWorks();
  console.log(filterTableau)
  // Création de portfolio
  const portfolio = document.getElementById("portfolio");
portfolio.appendChild(gallery);
// Création et mise en place de la div
const filter = document.createElement("div");
portfolio.appendChild(filter);
portfolio.insertBefore(filter, gallery);
// Création de "Filtes"
const filterText = document.createElement("p");
filter.appendChild(filterText);
filterText.textContent= "Filtres :"
// Création de input
for(i=0;i < filterTableau.length; i++){
const button = document.createElement("button");
filter.appendChild(button);
button.textContent = filterTableau[i].category.name
}

}
filterFunction()
