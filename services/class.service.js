const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");

exports.createClass = async function (token, clase) {
  let userBd;
  try {
    userBd = await UserService.findUserByToken(token);
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

exports.getClassById = async function (id) {
  try {
    const user = await User.findOne({ "servicios._id": id });
    const response = user.toJSON();
    delete response.servicios;
    response.servicio = await findClassByIdInUser(user, id);
    return response;
  } catch (error) {
    console.log(error);
    throw Error("Error al buscar la clase");
  }
};

exports.getClassesByCategory = async function (category) {
  const clases = [];
  try {
    const usuarios = await User.find({ "servicios.categoria": category });
    for (let i in usuarios) {
      let profesor = usuarios[i];
      let servicios = [];
      for (let j in profesor.servicios) {
        if (
          profesor.servicios[j].activo == true &&
          profesor.servicios[j].categoria.toLowerCase() ==
            category.toLowerCase()
        ) {
          servicios.push(profesor.servicios[j]);
        }
      }
      if (servicios.length != 0) {
        profesor.servicios = servicios;
        clases.push(profesor);
      }
    }

    return await clases;
  } catch (error) {
    console.log(error);
    throw Error("Error al buscar la clase");
  }
};

exports.deleteClass = async function (idClase, token) {
  try {
    let userBd = await UserService.findUserByToken(token);

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
    let userBd = await UserService.findUserByToken(token);
    if (!userBd) return 0;
    console.log("hola");
    let servicio = await findClassByIdInUser(userBd, idClase);
    console.log(servicio);
    servicio.categoria = newClase.categoria;
    servicio.tipoClase = newClase.tipoClase;
    servicio.frecuencia = newClase.frecuencia;
    servicio.metodologia = newClase.metodologia;
    servicio.costo = newClase.costo;
    servicio.duracion = newClase.duracion;
    servicio.descripcion = newClase.descripcion;

    var classUpdated = await userBd.save();

    return classUpdated;
  } catch (error) {
    throw Error("Error al buscar usuario / clase");
  }
};

exports.activateClass = async function (token, idClase) {
  try {
    let userBd = await UserService.findUserByToken(token);
    if (!userBd) return 0;
    let servicio = await findClassByIdInUser(userBd, idClase);
    servicio.activo = !servicio.activo;
    userBd.save();
    return { activo: servicio.activo, msg: "Se cambio el estado" };
  } catch (error) {
    return false;
  }
};

exports.contactUser = async function (contactBody, idClase) {
  const user = await User.findOne({ "servicios._id": idClase });
  const servicio = await findClassByIdInUser(user, idClase);

  user.notificaciones.push({
    tipo: "Contacto",
    descripcionServicio: servicio.descripcion,
    ...contactBody,
    idServicio: servicio._id,
    fecha: Date(),
    estado: "Pendiente",
    visto: false,
  });
  user.save();
  return await user.notificaciones;
};

findClassByIdInUser = async function (user, idClase) {
  return await user.servicios.find((servicio) => servicio._id.equals(idClase));
};

exports.createComment = async function (commentBody, idClase) {
  const { getClassById } = require("./class.service");
  const user = await User.findOne({ "servicios._id": idClase });
  const servicio = user.servicios.id(idClase);
  const comment = {
    fecha: new Date(),
    estrellas: commentBody.estrellas,
    mensaje: commentBody.mensaje,
    visto: false,
    estado: "Desactivado",
  };

  user.notificaciones.push({
    tipo: "Comentario",
    descripcionServicio: servicio.descripcion,
    ...comment,
    idServicio: servicio._id,
    fecha: Date(),
    estado: "Pendiente",
    visto: false,
  });
  user.save();
  return await user.notificaciones;
};
