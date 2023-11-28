const { findUserByToken } = require("./user.service");

exports.finalizarContratacion = async function (token, idContratacion) {
  try {
    const userBd = await findUserByToken(token);

    let contratacionEncontrada = null;

    userBd.servicios.forEach((servicio) => {
      if (servicio.contrataciones) {
        const contratacion = servicio.contrataciones.find((contra) => {
          return contra._id.valueOf() === idContratacion;
        });

        if (contratacion) {
          contratacionEncontrada = contratacion;
        }
      }
    });

    if (!contratacionEncontrada) {
      throw new Error("No se encontró la contratación con el ID proporcionado");
    }

    contratacionEncontrada.estado = "Cancelado";

    await userBd.save();

    return contratacionEncontrada;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
