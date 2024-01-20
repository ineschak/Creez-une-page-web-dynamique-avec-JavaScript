export function filtres(innerHTML, className, id) {
  let filter = document.createElement("button");
  let filters = document.querySelectorAll("#les_Filtres button");
  const container = document.getElementById("les_Filtres");
  container.appendChild(filter);
  //Création_filtres
  filter.innerHTML = innerHTML;
  filter.className = className;
  filter.id = id;
  //Ajout addEventlistener
  for (let filter of filters) {
    filter.addEventListener("click", function (e) {
      const tag = this.id;
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
}
