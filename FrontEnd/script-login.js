// Authentification de l’utilisateur

// Daprès le cours
function sendLogin() {
  const buttonConnexion = document.getElementById("connexion");

  buttonConnexion.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Create object Login
    const login = {
      email: event.target.querySelector("[name=email]").value,
      mdp: event.target.querySelector("[name=mdp]").value,
    };
    //Create utile charge JSON
    const chargeUtile = JSON.stringify(login);
    // Call function fetch
    const replogin = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      header: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });
    if(replogin < 400){
        const data = await replogin.json()
        console.log("Victoire", data)
    }
  });
}

sendLogin();
