export function form() {  
  
  const token = window.localStorage.getItem("token");
  if (token == null) {
 
   
      console.log(" NON CONNECTE");
      
  const form = document.getElementById("formulaire");
  console.log(form)
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
      const result = await response.json();
      

      if (response.status == 200) {
        window.localStorage.setItem("token", result.token);
        const token = window.localStorage.getItem("token");
        console.log(token);
        location.href = "./index.html"; 
      } else {
        erreur_message.innerHTML = " ERROR : User " + response.statusText;
        erreur_message.className = "alert";
        const form = document.getElementById("formulaire");
        form.appendChild(erreur_message); 
      } 
    } 

    postUser();
  });
 
}

}
 

