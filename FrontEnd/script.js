// Récupérer les projets de l'architecte
import { getProjets } from "./api.js";
getProjets();

// Afficher les projets récupérés
import { displayProject } from "./projects.js";
displayProject();

// Création des filtres
import { filtres } from "./filters.js";
filtres("Tous", "classe_filtre actif", "0");
filtres("Objets", "classe_filtre inactif", "1");
filtres("Appartements", "classe_filtre inactif", "2");
filtres("Hôtels & restaurants", "classe_filtre inactif", "3");

//Page de connexion
const Bouton_Login = document.getElementById("Bouton");
Bouton_Login.addEventListener("click", function () {
  location.href = "./login.html";
});

//Traiter les données du formulaire
import { form } from "./form.js";
form();

//Redirection & Création modal
import { modal } from "./modal.js";
modal();
localStorage.clear();

//Envoi nouveau projet

form.onsubmit = async (e) => {
  e.preventDefault();

  let data = {
    titre: document.getElementById("title").value,
    catégorie: document.getElementById("catégorie").value,
  };

  console.log(data);
  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: new FormData(form),
    headers: { Authorization: "Bearer " + token },
  });

  let result = await response.json();
  console.log(result);
  alert(result.message);
};
