var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();


exports.loginUser = async function (user) {
  try {
    console.log("user", user)

    const userBd = await User.findOne({ mail: user.mail })
    const passwordIsValid = bcrypt.compareSync(user.password, userBd.password);
    if (!passwordIsValid) return 0;

    const token = jwt.sign({ id: userBd._id }, process.env.TOKEN_SECRET, { expiresIn: 86400 })

    return { token: token, user: userBd }

  }
  catch (error) {
    throw Error("Error while Login User")
  }
}

exports.createUser = async function (user) {
  user.password = bcrypt.hashSync(user.password, 8);
  console.log(user)
  const newUser = new User(user)
  try {
    const savedUser = await newUser.save()
    const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET, { expiresIn: 86400 })
    return token;
  } catch (error) {
    console.log(error)
    throw Error("Error while Creating User")
  }
}

exports.updateUser = async function (user) {
  console.log(user)
  var id = { mail: user.mail }
  console.log(id)
  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
    console.log(oldUser)
  } catch (e) {
    throw Error("Error occured while Finding the User")
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }
  //Edit the User Object
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre
  oldUser.mail = user.mail
  oldUser.apellido = user.apellido
  oldUser.telefono = user.telefono
  oldUser.ubicacion = user.ubicacion
  oldUser.imagen = user.imagen
  oldUser.experiencia = user.experiencia
  oldUser.password = hashedPassword
  try {
    var savedUser = await oldUser.save()
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
}































// const { User } = require("../models/User.model");

// const nuevoUser = new User({
//   nombre: "Juan Martin",
//   apellido: "Caceres",
//   telefono: "1234567810",
//   mail: "proveedor1@example.com",
//   experiencia:
//     "Como tutor experimentado, comprendo las necesidades únicas de mis estudiantes. Mi objetivo es proporcionar un ambiente de aprendizaje enriquecedor y estimulante.",
//   password: "password1",
//   ubicacion: "Rosario",
//   img: "https://img.freepik.com/fotos-premium/hombre-guapo-pelo-corto-sobre-fondo-gris_251136-30459.jpg?size=626&ext=jpg&ga=GA1.2.88060135.1696466475&semt=ais",
//   servicios: [
//     {
//       categoria: "Inglés",
//       tipoClase: "Grupal",
//       frecuencia: "Mensual",
//       calificacion: 3.3,
//       metodologia: "Ambas",
//       costo: 2900,
//       duracion: 1,
//       descripcion:
//         "Mejora tus habilidades en el idioma inglés con mis clases en línea. Trabajaremos en gramática, vocabulario y conversación para que te sientas más seguro y fluido en este idioma tan importante.",
//       activo: true,
//       comentarios: [
//         {
//           fecha: "2023-06-02T15:29:26",
//           calificacion: 4.3,
//           mensaje: "Quisquam etincidunt adipisci dolor numquam non.",
//           visto: true,
//           estado: "Aceptado",
//         },
//       ],
//     },
//   ],
// });

// nuevoUser.save();
