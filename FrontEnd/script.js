async function getProjets() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

// Ajouter à la gallerie les projets récupéré
async function displayProject() {
  const project = await getProjets();
  for (const element of project) {
    const mesProjets = document.createElement("div");
    mesProjets.className = "gallery";
    const article = document.createElement("figure");
    const articleImage = document.createElement("img");
    const articleTitle = document.createElement("figcaption");
    articleImage.src = element.imageUrl;
    article.classList = "active";
    if (element.category.name == "Objets") {
      article.dataset.id = "1";
    }
    if (element.category.name == "Appartements") {
      article.dataset.id = "2";
    }
    if (element.category.name == "Hotels & restaurants") {
      article.dataset.id = "3";
    }
    articleTitle.textContent = element.title;
    Parent = document.getElementById("MyProjects");
    Parent.appendChild(article);
    article.appendChild(articleImage);
    article.appendChild(articleTitle);
  }
}
displayProject();

// Création des filtres
function Filtres(innerHTML, className, id) {
  let filter = document.createElement("button");
  filter.innerHTML = innerHTML;
  filter.className = className;
  filter.id = id;
  const container = document.getElementById("filtres");
  container.appendChild(filter);
}

Filtres("Tous", "all actif", "0");
Filtres("Objets", "objects inactif", "1");
Filtres("Appartements", "appartments inactif", "2");
Filtres("Hôtels & restaurants", "Hôtels_restaurants inactif", "3");

// Ajout des EventListeners pour les filtres
let filters = document.querySelectorAll("#filtres button");

for (let filter of filters) {
  filter.addEventListener("click", function () {
    let tag = this.id;

    filters[tag].classList.replace("inactif", "actif");
    filters[tag - 1].classList.replace("actif", "inactif");
    let articles = document.querySelectorAll("#MyProjects figure");
    for (let article of articles) {
      article.classList.replace("active", "inactive");
      if (tag === article.dataset.id || tag === "0") {
        article.classList.replace("inactive", "active");
      }
    }
  });
}

// Création de la page de connexion
const int = document.getElementById("introduction");
const port = document.getElementById("portfolio");
const cont = document.getElementById("contact");
const main = document.getElementById("Main");
const Bouton_Login = document.getElementById("Bouton");

Bouton_Login.addEventListener(
  "click",
  function () {
    Bouton_Login.className = "login";
    int.className = "off";
    port.className = "off";
    cont.className = "off";
    const conteneur = document.createElement("section");
    const titre = document.createElement("h2");
    titre.innerHTML = "Log In";
    titre.className = "h2";
    conteneur.appendChild(titre);
    const form = document.getElementById("formulaire");
    form.className.remove = "off";
    conteneur.appendChild(form);
    const paragraphe = document.createElement("p");
    paragraphe.innerHTML = "Mot de passe oublié";
    paragraphe.className = "p";
    conteneur.appendChild(paragraphe);
    main.appendChild(conteneur);
    main.className = "mainClass";
    const logo= document.getElementById("logo")
    logo.addEventListener("click",function(){
      window.location="./index.html"
    })
   
  },
  { once: true }
);

const form = document.getElementById("formulaire");

form.addEventListener("submit", (Event) => {
  Event.preventDefault();
  let user = {
    email: document.getElementById("e_mail").value,
    password: document.getElementById("mot de passe").value,
  };

  PostUser();
  // Création de la charge utile au format JSON

  async function PostUser() {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    console.log(result)
    if (response.status == 404 || response.status == 401) {
      const message = document.createElement("span");
      message.innerHTML = "ERREUR !";
      message.className = "alert";
      const form = document.getElementById("formulaire");
      form.appendChild(message);
    }
    if (response.status == 200) {
      window.location = "./index1.html";
    }
  }
});
