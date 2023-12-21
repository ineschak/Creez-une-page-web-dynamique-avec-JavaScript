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
    const Parent = document.getElementById("MyProjects");
    Parent.appendChild(article);
    article.appendChild(articleImage);
    article.appendChild(articleTitle);
  }
}
displayProject();

// Création des filtres
function filtres(innerHTML, className, id) {
  let filter = document.createElement("button");
  filter.innerHTML = innerHTML;
  filter.className = className;
  filter.id = id;
  const container = document.getElementById("les_Filtres");
  container.appendChild(filter);
  return container;
}

filtres("Tous", "classe_filtre actif", "0");
filtres("Objets", "classe_filtre inactif", "1");
filtres("Appartements", "classe_filtre inactif", "2");
filtres("Hôtels & restaurants", "classe_filtre inactif", "3");

// Ajout des EventListeners pour les filtres
let filters = document.querySelectorAll("#les_Filtres button");

for (let filter of filters) {
  filter.addEventListener("click", function (e) {
    tag = this.id;
    if (document.querySelector("#les_Filtres button.actif") !== null) {
      document
        .querySelector("#les_Filtres button.actif")
        .classList.replace("actif", "inactif");
    }
    e.target.className = "classe_filtre actif";

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
/*const int = document.getElementById("introduction");
const port = document.getElementById("portfolio");
const cont = document.getElementById("contact");
const main = document.getElementById("Main");*/

const Bouton_Login = document.getElementById("Bouton");

Bouton_Login.addEventListener("click", function () {
  location.href = "./login.html";
});

/*Bouton_Login.className = "login";
    int.className = "off";
    port.className = "off";
    cont.className = "off";
    const conteneur = document.createElement("section");
    conteneur.id = "Formulaire";
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
    const logo = document.getElementById("logo");
    logo.classList = "curseur";
    logo.addEventListener("click", function () {
      window.location = "./index.html";
    });
  },
  { once: true }
);*/

const form = document.getElementById("formulaire");

form.addEventListener("submit", (Event) => {
  Event.preventDefault();
  //let logged = false;
  let user = {
    email: document.getElementById("e_mail").value,
    password: document.getElementById("mot de passe").value,
  };

  async function postUser() {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(user),
    });
    result = await response.json();

    if (response.status == 404 || response.status == 401) {
      console.log(result);
      const erreur_message = document.createElement("span");
      erreur_message.innerHTML = " ERROR : " + result.message;
      erreur_message.className = "alert";
      const form = document.getElementById("formulaire");
      form.appendChild(erreur_message);
      //alert("Erreur !")
    }
    if (response.status == 200) {
      window.localStorage.setItem("token", result.token);
      const token = window.localStorage.getItem("token");
      console.log(token);
      logged = true;
    }
    return logged;
  }

  async function redirection() {
    const feedback = await postUser();
    console.log(feedback);
    if (feedback == true) {
      window.location = "./index1.html"; //"index.html"
      console.log(document);
    }
  }
  redirection();

  //je ne peux pas accéder au contenu de "index1.html" !!
  /*const modal= document.getElementById("bouton_modal")
    console.log(modal)
     modal.addEventListener("click", async function(){
    
      const project = await getProjets();
      console.log(project)
    
    })*/
  /* const les_Filtres=document.getElementById("les_Filtres")
    console.log(les_Filtres) //toujours pas d'accès au contenu !!
  }}
     
    redirection()*/
});
