import { getProjets } from "./api.js";
export function modal() {
  const token = window.localStorage.getItem("token");
  if (token !== null) {
    console.log("CONNECTE");
    const newdiv = document.getElementById("EnTête");
    newdiv.classList = "En_Tete on";
    const divbody = document.getElementById("divbody");
    divbody.classList = "class_body";
    const body = document.getElementById("body");
    body.classList.remove("class_body");
    const btnlogin = document.getElementById("Bouton");
    btnlogin.classList = "off";
    const btnlogout = document.getElementById("btn_logout");
    btnlogout.classList = "cursor";
    const container = document.getElementById("les_Filtres");
    container.classList = "off";
    const h2 = document.getElementById("h2");
    h2.classList = "off";
    const divmodif = document.getElementById("modifier");
    divmodif.classList = "modifier on";

    btnlogout.addEventListener("click", function () {
      newdiv.classList = "off";
      body.classList = "class_body";
      divbody.classList.remove("class_body");
      container.classList = "Filtres";
      divmodif.classList = "off";
      h2.classList = "h2";
      btnlogout.classList = "off";
      btnlogin.classList = "cursor";
    });

    const bouton_modal = document.getElementById("bouton_modal");
    bouton_modal.addEventListener("click", async function displayModal(e) {
      e.preventDefault();
      const gallerymodal = document.getElementById("gallery-modal");
      gallerymodal.textContent = "";
      const project = await getProjets();
      const modal = document.querySelector(e.target.getAttribute("href"));
      modal.classList = "modal";
      window.onclick = function (e) {
        if (e.target == modal) {
          modal.classList = "off";
        }
      };
      const closebutton = document.getElementById("close_button");
      closebutton.onclick = function () {
        modal.classList = "off";
      };

      for (const element of project) {
        const divElement = document.createElement("div");
        divElement.className = "photo_size";
        gallerymodal.appendChild(divElement);
        const photogallery = document.createElement("img");
        photogallery.src = element.imageUrl;
        photogallery.className = "image";
        divElement.appendChild(photogallery);
        const icone = document.createElement("img");
        icone.src = "./assets/icons/Group 10.svg";
        icone.className = "icone";
        divElement.appendChild(icone);
        icone.dataset.id = element.id;
        const modalbody = document.getElementById("modalbody");
        const ajouterProjet = document.getElementById("ajouterProjet");
        //modal pour ajouter des projets
        ajouterProjet.onclick = function () {
          modalbody.classList = "off";
          const newbody = document.getElementById("modalbodyAjoutProjet");
          newbody.classList = "newmodalbody";
          const arrow = document.getElementById("arrow");

          arrow.classList = "fleche_modal ";
          arrow.onclick = function () {
            newbody.classList = "off";
            modalbody.classList = "modalbody visible";
            arrow.classList = "off";
          };
          const inputFile = document.getElementById("file");
          const ajoutphoto = document.getElementById("ajoutphoto");
          const displayphoto = document.getElementById("displayphoto");

          inputFile.addEventListener("change", function () {
            ajoutphoto.classList = "off";
            displayphoto.classList = "on";
            displayphoto.src = URL.createObjectURL(inputFile.files[0]);
          });
        };
        //Envoi nouveau projet
        const formModal = document.getElementById("formModal");

        formModal.addEventListener("submit", async function sendData(e) {
          e.preventDefault();
          const formData = new FormData(formModal);
          console.log(formData);

          const response = await fetch("http://localhost:5678/api/works", {
            body: formData,
            method: "post",
            headers: { Authorization: "Bearer " + token },
          });
          if (response.status == 200 || response.status == 204) {
          console.log("Données envoyées")

          }
           
        });

        //Suppression des projets
        icone.addEventListener("click", async function suppressionItemModal() {
          const id = this.dataset.id;

          const response = await fetch(
            `http://localhost:5678/api/works/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: "Bearer " + token },
            }
          );

          console.log(response.status);
          if (response.status == 200 || response.status == 204) {
            icone.closest("div").classList = "off";
            window.stop();
          }
        });
      }
    });
  }
}
