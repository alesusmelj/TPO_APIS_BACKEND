const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.createClase = async function (token, clase) {
  let userBd;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decoded.id;
    userBd = await User.findOne({ _id: userId });

    if (!userBd) {
      return res
        .status(404)
        .json({ status: 404, message: "Usuario no encontrado" });
    }
  } catch (e) {
    return res.json({ message: "Error al buscar usuario" });
  }

  try {
    userBd.servicios.push(clase);
    var classSaved = await userBd.save();
    return classSaved;
  } catch (e) {
    console.log(e);
    throw Error("And Error occured while creating the class");
  }
};
