const ClassService = require("../services/class.service");
const UserService = require("../services/user.service");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.createClass = async function (req, res) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decoded.id;
    const userBd = await User.findOne({ _id: userId });

    if (!userBd) {
      return res
        .status(404)
        .json({ status: 404, message: "Usuario no encontrado" });
    }
  } catch (e) {
    return res.json({ message: "Error al buscar usuario" });
  }

  const {
    categoria,
    tipoClase,
    frecuencia,
    metodologia,
    costo,
    duracion,
    descripcion,
  } = req.body;

  const clase = {
    categoria,
    tipoClase,
    frecuencia,
    calificacion: 0,
    metodologia,
    costo,
    duracion,
    descripcion,
    activo: true,
    comentarios: [],
  };

  if (
    categoria &&
    tipoClase &&
    frecuencia &&
    metodologia &&
    costo &&
    duracion &&
    descripcion
  ) {
    try {
      const createdClase = await ClassService.createClase(userBd, clase);
      return res
        .status(201)
        .json({ createdClase, message: "Succesfully created class" });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ status: 400, message: "Class creation was unsuccesfull" });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "Se deben ingresar los campos obligatorios",
    });
  }
};

exports.deleteClass = async function (req, res) {};
