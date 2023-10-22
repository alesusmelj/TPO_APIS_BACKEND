var ClasesService = require("../services/clases.service");

// Esto va a crear una clase en la BD sin ningun usuario, ¿No tendriamos que matchear el usuario primero?
exports.createClass = async function (req, res) {
  const {
    categoria,
    tipoClase,
    frecuencia,
    //calificacion, No hay ninguna calificacion al crear el servicio?
    metodologia,
    costo,
    duracion,
    descripcion,
  } = req.body;

  const clase = {
    categoria,
    tipoClase,
    frecuencia,
    //calificacion
    metodologia,
    costo,
    duracion,
    descripcion,
    activo: true, //Seteamos la clase como activa de entrada
    comentarios: [], // Inicializamos la lista de comentarios vacia
  };

  try {
    const createdClase = await ClasesService.createClase(clase);
    return res
      .status(201)
      .json({ createdClase, message: "Succesfully created class" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Class creation was unsuccesfull" });
  }
};
