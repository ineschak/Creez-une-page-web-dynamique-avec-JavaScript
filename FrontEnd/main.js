// Récupérer les projets de l'architecte
import { projects } from "./projects.js";
projects();

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

// Formulaire de connexion & Redirection
import { form } from "./form.js";
form();

// Ajout de la modale
import { modal } from "./modal.js";
modal();
