// Constante contenu
const figure = document.createElement("figure");
gallery.appendChild(figure);
const img = document.createElement("img");
figure.appendChild(img);
const figcaption = document.createElement("figcaption");
figure.appendChild(figcaption);

//  API
async function fetchProject() {
  const tableauProject = await fetch("http://localhost:5678/api/works");
  const tableauProjectJson = tableauProject.json();
  const article = tableauProjectJson[0]
  img.src = tableauProjectJson.imageUrl;
figcaption.innerText = tableauProjectJson.title
  console.log(tableauProjectJson);
}

fetchProject();
