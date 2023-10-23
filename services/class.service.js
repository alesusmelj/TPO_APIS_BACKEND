const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service")

exports.createClass = async function (token, clase) {
  let userBd
  try {
    userBd = await UserService.findUserByToken(token)
    if (!userBd) return 0;
  } catch (error) {
    throw Error("Error al buscar usuario");
  }

  try {
    userBd.servicios.push(clase);
    var classSaved = await userBd.save();
    return classSaved;
  } catch (error) {
    throw Error("And Error occured while creating the class");
  }
};

exports.deleteClass = async function (idClase, token) {
  try {
    let userBd = await UserService.findUserByToken(token)

    if (!userBd) return 0;

    const cantServicios = userBd.servicios.length;

    userBd.servicios.pull(idClase);
    var classDeleted = await userBd.save();
    if (classDeleted.servicios.length == cantServicios) return 1;

    return classDeleted;
  } catch (error) {
    throw Error("Error al buscar usuario / clase");
  }
};

exports.updateClass = async function (idClase, token, newClase) {
  try {
    let userBd = await UserService.findUserByToken(token)
    if (!userBd) return 0;
    console.log("hola")
    let servicio = await findClassById(userBd, idClase)
    console.log(servicio)
    servicio.categoria = newClase.categoria
    servicio.tipoClase = newClase.tipoClase
    servicio.frecuencia = newClase.frecuencia
    servicio.metodologia = newClase.metodologia
    servicio.costo = newClase.costo
    servicio.duracion = newClase.duracion
    servicio.descripcion = newClase.descripcion

    var classUpdated = await userBd.save();

    return classUpdated
  } catch (error) {
    throw Error("Error al buscar usuario / clase");
  }
}

exports.activateClass = async function (token, idClase) {
  try {
    let userBd = await UserService.findUserByToken(token)
    if (!userBd) return 0;
    let servicio = await findClassById(userBd, idClase)
    servicio.activo = !servicio.activo;
    userBd.save()
    return { activo: servicio.activo, msg: "Se cambio el estado" }
  } catch (error) {
    return false;
  }
}

findClassById = async function (user, idClase) {
  return await user.servicios.find(servicio => servicio._id.equals(idClase));
}