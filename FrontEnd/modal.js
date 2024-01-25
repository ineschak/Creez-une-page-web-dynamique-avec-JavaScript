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
export function modal() {
  const token = window.localStorage.getItem("token");
  if (token !== null) {
    const btnlogout = document.getElementById("btn_logout");
    const body = document.getElementById("body");
    const divbody = document.getElementById("divbody");
    const btnlogin = document.getElementById("Bouton");
    const container = document.getElementById("les_Filtres");
    const divmodif = document.getElementById("modifier");
    const newdiv = document.getElementById("EnTête");
    console.log("CONNECTE");
    newdiv.classList = "En_Tete on";
    divbody.classList = "class_body";
    body.classList.remove("class_body");
    btnlogin.classList = "off";
    btnlogout.classList = "cursor";
    container.classList = "off";
    const h2 = document.getElementById("h2");
    h2.classList = "off";
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
      localStorage.clear();
    });

    // Ajout de la fenêtre modale
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

        // Envoi d’un nouveau projet
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
          const image = document.getElementById("displayphoto");
          inputFile.addEventListener("change", function () {
            ajoutphoto.classList = "off";
            image.classList = "on";
            image.src = URL.createObjectURL(inputFile.files[0]);
          });

          const formModal = document.getElementById("formModal");
          const formData = new FormData();
          const title = document.getElementById("title");
          const category = document.getElementById("catégorie");
          formData.append("image", inputFile.files[0]);
          formData.append("title", title.value);
          formData.append("category", category.value);
          const btn = document.getElementById("Btn_submit");
          const message_erreur = document.createElement("span");
          const message_succès = document.createElement("span");
          const message = document.getElementById("message");
          const bordure = document.getElementById("bordure");
          const input = document.getElementById("catégorie");
          message_erreur.classList = "message";
          message_succès.classList = "messageSuccès";
          message_erreur.innerHTML = "Veuillez remplir tous les champs!";
          message_succès.innerHTML = "Le formulaire est correctement envoyé";
          formModal.onchange = () => {
            if (
              title.value !== "" &&
              title.value !== null &&
              category.value !== null &&
              category.value !== "" &&
              inputFile.files[0].name !== "" &&
              inputFile.files[0].name !== null &&
              inputFile.files[0]
            ) {
              btn.classList = "btnsubmit cursor";
              message_erreur.classList = "off";
            } else {
              btn.classList = "btnValider  cursor";
            }
          };

          // Traitement de la réponse de l’API
          formModal.addEventListener("submit", async function sendData(e) {
            e.preventDefault();
            const formData = new FormData(formModal);
            if (
              title.value == "" ||
              title.value == null ||
              category.value == null ||
              category.value == "" ||
              inputFile.files[0] == "" ||
              inputFile.files[0] == null
            ) {
              message.appendChild(message_erreur);

              bordure.classList = "new_bordure";
              input.classList = "category";
            } else {
              const response = await fetch("http://localhost:5678/api/works", {
                body: formData,
                method: "post",
                headers: { Authorization: "Bearer " + token },
              });
              if (response.status == 200 || response.status == 201) {
                message.appendChild(message_succès);
                bordure.classList = "new_bordure";
                input.classList = "category";
              }
            }
            window.stop();
          });
        };
      }
    });
  }
}
