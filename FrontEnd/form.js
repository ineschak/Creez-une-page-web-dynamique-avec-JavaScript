export function form() {
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
      const result = await response.json();
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
        location.href = "./index.html";
      }
    }

    postUser();
  });
}
