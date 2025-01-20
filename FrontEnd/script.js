//  API
async function fetchProject() {
  const tableauProject = await fetch("http://localhost:5678/api/works");
  const tableauProjectJson = tableauProject.json();
  const article = tableauProjectJson[0]
  console.log(tableauProjectJson);
  for(i = 1; i < 12; i++ ){
    const figure = document.createElement("figure");
gallery.appendChild(figure);
const img = document.createElement("img");
figure.appendChild(img);
img.src = tableauProjectJson.imageUrl;
const figcaption = document.createElement("figcaption");
figure.appendChild(figcaption);
figcaption.innerText = tableauProjectJson.title
  }
}

fetchProject();
