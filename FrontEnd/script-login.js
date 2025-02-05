const formConnexion = document.getElementById("formConnexion");

formConnexion.addEventListener("submit", async function (event) {
  event.preventDefault(); // Stop the default form submission

  const login = {
    email: document.getElementById("email").value,
    password: document.getElementById("mdp").value,
  };
  const replogin = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });
  const reploginData = await replogin.json(); 
  if (replogin.status === 200) {
    sessionStorage.setItem("authToken", reploginData.token);
    window.location.href = "./index.html";
  } else {
    const errorMessage = document.querySelector("#formulaire p")
    errorMessage.classList.add("active")
  }
});