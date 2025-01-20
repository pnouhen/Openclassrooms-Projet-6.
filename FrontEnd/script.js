//  Récupération des travaux depuis le back-end
async function fetchProject() {
  const tableauProject = await fetch("http://localhost:5678/api/works");
  const tableauProjectJson = await tableauProject.json();
  const article = tableauProjectJson[0];
  console.log(tableauProjectJson);
  for (i = 0; i < tableauProjectJson.length; i++) {
    // Figure in Gallery
    const figure = document.createElement("figure");
    gallery.appendChild(figure);
    // Image
    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = tableauProjectJson[i].imageUrl;
    // Title
    const figcaption = document.createElement("figcaption");
    figure.appendChild(figcaption);
    figcaption.innerText = tableauProjectJson[i].title;
  }
}
fetchProject();

// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie 