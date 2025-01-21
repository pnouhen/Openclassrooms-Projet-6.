// Faire le lien avec l'API/works
async function apiWorks(){
  const tableauWorks = await fetch("http://localhost:5678/api/works");
  const tableauWorksJson = await tableauWorks.json();
  return tableauWorksJson
  
}
//  Récupération des travaux depuis le back-end
async function fetchProject() {
  const tableauProject = await apiWorks()
  console.log(tableauProject)
  for (i = 0; i < tableauProject.length; i++) {
    // Figure in Gallery
    const figure = document.createElement("figure");
    const gallery = document.getElementById('gallery')
    gallery.appendChild(figure);
    // Image
    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = tableauProject[i].imageUrl;
    // Title
    const figcaption = document.createElement("figcaption");
    figure.appendChild(figcaption);
    figcaption.innerText = tableauProject[i].title;
}
}
fetchProject();

// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie 
