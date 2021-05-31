document.addEventListener("DOMContentLoaded",  (ev) => {
    document 
        .querySelector("#formLogin")
        .addEventListener("submit",async (ev) => {
            ev.preventDefault();

            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            try{
                const responseLogin = await fetch("http://localhost:3001/login",{
                    method: "POST",
                    body: JSON.stringify({username, password}),
                    headers: myHeaders,
                });
                const resposeObject = await responseLogin.json();
                if(responseLogin.status == 200){
                    alert("login exitoso");
                    localStorage.setItem("token",JSON.stringify(resposeObject))
                    window.location.href = "mascotas.html"
                } else {
                    alert(resposeObject.error);
                }
            }catch (error) {
                alert("Algo salio mal");
            }
        });
});