document.addEventListener("DOMContentLoaded", (ev) => {
    document
      .querySelector("#cargarMascotas")
      .addEventListener("click", async (ev) => {
        if (localStorage.getItem("token") == null) {
          window.location.href = "index.html";
        }
  
        const tokenObject = JSON.parse(localStorage.getItem("token"));
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${tokenObject.token} `);
  
        try {
          const responseMascotas = await fetch("http://localhost:3001/mascotas", {
            method: "GET",
            headers: myHeaders,
          });
          const responseObject = await responseMascotas.json();
  
          if (responseMascotas.status == 200) {
            document.querySelector("#mascotas").innerHTML =
              JSON.stringify(responseObject);
          } else {
            window.location.href = "index.html";
          }
        } catch (error) {
          alert("algo salio mall");
          window.location.href = "index.html"
        }
      });

  document.querySelector("#logout").addEventListener('click',()=>{
    localStorage.clear();
    window.location.href = "index.html";
  });
});
  