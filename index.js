//1. importar express y demas librerias
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const createHash = require('hash-generator');
const hash = createHash(128); //cadena de 128 caracterres random de que usa para crear un Bearer token
const USUARIOS = require("./conexion").usuarios// trae la collecion usuarios de la base de datos "datos";
const MASCOTAS = require("./conexion").mascotas// trae la collecion mascotas de la base de datos "datos";

//2. crear instancia de express
const server = express();

//3. agregar middlewares globales (que es un middleware?) lo vemos la otra clase
server.use(express.json()); // nos ubica el body en el objeto request
server.use(compression());
server.use(helmet());
server.use(cors());

//3.1 crear politicas de cantidad de peticiones
const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 3,
  message: "Excediste el numero de peticiones intenta mas tarde",
});

//3.2 definir la cadena segura de generacion de tokens
// por nada en la vida compartan esta cadena NADDAAAAAAAAAAAAAAAAAAA!!!!!!!!!
const secretJWT = hash;

//3.3 proteger todos los endpoints menos el de login usando express-jwt como middleware global
server.use(
  expressJwt({
    secret: secretJWT,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login"],
  })
);

//4. definir constantes
const PORT = 3001;
//5. escribir las rutas o endpoints de nuestra nueva API REST
// instancia.[verbo] ('/ruta', (request,response)=>{
//    escribir la logica del enpoint
// responder algo al cliente
//})

//5.1 definir el enpoint de login
server.post("/login", (req, res) => {
  const usernamePost = req.body.username;
  const passwordPost = req.body.password;
  // console.log(usernamePost,typeof(usernamePost));
  // console.log(passwordPost,typeof(passwordPost));
  // const usuarioValido = USUARIOS.find(
  //   (usu) => usu.nombre == usernamePost && usu.password == passwordPost
  // );

  USUARIOS.findOne({nombre: usernamePost ,password :passwordPost}, function (err, docs) {
  if (err){
    console.log(err)
  }
  else{
    if(docs === null){
      console.log("Usuarios encontrado : ",docs);
    }else {
      console.log("Usuarios encontrado : ",docs.nombre);
    }
    validator(docs);
    if(docs.admin == true){
      console.log("Usuario Administrador")
    }else {
      console.log("Usuario Cliente")
    }
  }
  });

  function validator(docs){
  if (docs === null) {
    res.status(401).json({ error: "compruebe usuario y contraseña" });
  } else {
    // crear el token con data que no sea tan confidencial
    const token = jwt.sign({nombre:docs.nombre, id: docs.id},secretJWT,{ expiresIn: "10s" });
    res.status(200).json({ token });
    // console.log(JSON.stringify({ token }));
  }
  }
});


server.get("/mascotas", (req, res) => {
  MASCOTAS.find()
  .then((masc)=>{
    res.status(200)
    // .json(masc);
    let animales = [];
    function maker(x,y){
      class pet {
        constructor (x, y) {
          this.nombre = x;
          this.raza = y;
        }
      }
      return new pet(x, y)
    }
    masc.forEach(element =>animales.push(maker(element.nombre, element.raza)));
    res.send(animales);
  }, (err)=>{
    console.log(err)
  })
});

//6. levantar el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});