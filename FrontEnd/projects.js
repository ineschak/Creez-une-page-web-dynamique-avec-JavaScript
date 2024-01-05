import { getProjets } from "./api.js";
export async function displayProject() {
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
