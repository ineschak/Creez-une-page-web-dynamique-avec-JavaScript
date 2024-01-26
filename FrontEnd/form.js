export function form() {
  const token = window.localStorage.getItem("token");
  if (token == null) {
    const form = document.getElementById("formulaire");
    const erreur_message = document.createElement("span");
    erreur_message.innerHTML = "";
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

        if (response.status == 200) {
          const result = await response.json();
          window.localStorage.setItem("token", result.token);
          const token = window.localStorage.getItem("token");
          console.log(token);
          location.href = "./index.html";
        } else {
          erreur_message.innerHTML = "Veuillez vérifier vos informations";
          erreur_message.className = "alert";
          const form = document.getElementById("formulaire");
          form.appendChild(erreur_message);
        }
      }

      postUser();
    });
  }
}
