const ContratacionService = require("../services/contratacion.service");

exports.finalizarContratacion = async function (req, res) {
  const id = req.params["id"];
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token no proporcionado" });
  }

  try {
    const changedFinalizado = await ContratacionService.finalizarContratacion(
      token,
      id
    );

    if (changedFinalizado) {
      return res.status(200).json(changedFinalizado);
    } else {
      return res.status(500).send("Hubo un error");
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "Error al procesar contratacion", error });
  }
};
