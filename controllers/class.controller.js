const ClassService = require("../services/class.service");
const UserService = require("../services/user.service");

exports.createClass = async function (req, res) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token no proporcionado" });
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
      const createdClase = await ClassService.createClase(token, clase);
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
