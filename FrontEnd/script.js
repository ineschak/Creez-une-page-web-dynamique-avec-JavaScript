/*const token = window.localStorage.getItem("token");
if (token !== null) {
  console.log("CONNECTE");
  const newdiv = document.getElementById("EnTête");
  newdiv.classList = "En_Tete on";
  console.log(newdiv); 
} */

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

const Bouton_Login = document.getElementById("Bouton");

Bouton_Login.addEventListener("click", function () {
  location.href = "./login.html";
});

//Traiter les données du formulaire
const form = document.getElementById("formulaire");

form.addEventListener("submit", (Event) => {
  Event.preventDefault();

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
     location.href="./index1.html"
    }
  }

  postUser();

  //   // PLUTOT ICI UTILISER UN TOGGLE

  //   divCache.classList.remove("off");

  //   divCache.classList.add("on");

  // } else {

  //   // PLUTOT ICI UTILISER UN TOGGLE

  //   divCache.classList.remove("on");

  //   divCache.classList.add("off");

  // }

  // console.log(divCache);

  // console.log(token);

  // Autre façon de faire

  /*function addElementCacheDOM() {

  const parent = document.getElementById("class1");

  const element = document.createElement("div");

  element.classList.add("TEST");

  element.appendChild(parent);

}*/

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
