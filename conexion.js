const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/datos',{useNewUrlParser: true, useUnifiedTopology: true});

let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: { type: String },
    password: { type: String },
    admin: { type: Boolean}
}, { versionKey: false });

const usuarios = mongoose.model("usuarios", userSchema);


let petsSchema = new Schema({
    nombre: { type: String },
    raza: { type: String },
    tipo: { type: String }
}, { versionKey: false });

const mascotas = mongoose.model("mascotas", petsSchema);


// usuarios.insertMany([
//     {
//       nombre: "javi",
//       password: "password2020",
//       admin: false,
//     },
//     {
//       nombre: "franco",
//       password: "password2020",
//       admin: true,
//     },
//     {
//       nombre: "mike",
//       password: "password2020",
//       admin: false,
//     },
// ])
// .then(()=>{
//     console.log("Data inserted")
// }).catch((error)=>{
//     console.log(error);
// });

// mascotas.insertMany([
//     {
//       nombre: "Pancho",
//       raza: "Border collie",
//       tipo:"perro"
//     },
//     {
//       nombre: "Beethoven",
//       raza: "Caniche",
//       tipo:"perro"
//     },
//     {
//       nombre: "Goofy",
//       raza: "Pastor alemán",
//       tipo:"perro"
//     },
//     {
//         nombre: "Odie",
//         raza: "Golden retriever",
//         tipo:"perro"
//     },
//     {
//         nombre: "Laika",
//         raza: "Doberman pinscher",
//         tipo:"perro"
//     }
// ])
// .then(()=>{
//     console.log("Data inserted")
// }).catch((error)=>{
//     console.log(error);
// });

// usuarios.find().then((res)=>{
//     console.log(res)
// });

// mascotas.find().then((res)=>{
//     console.log(res)
// });


module.exports = {usuarios, mascotas}