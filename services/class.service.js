const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.createClass = async function (token, clase) {
  let userBd;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decoded.id;
    userBd = await User.findOne({ _id: userId });

    if (!userBd) return 0;
  } catch (error) {
    throw Error("Error al buscar usuario");
  }

  try {
    userBd.servicios.push(clase);
    var classSaved = await userBd.save();
    return classSaved;
  } catch (error) {
    console.log(e);
    throw Error("And Error occured while creating the class");
  }
};

exports.deleteClass = async function (id, token) {
  let userBd;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decoded.id;
    userBd = await User.findOne({ _id: userId });

    if (!userBd) return 0;

    const cantServicios = userBd.servicios.length;

    userBd.servicios.pull(id);
    var classDeleted = await userBd.save();

    if (classDeleted.servicios.length == cantServicios) return 1;

    return classDeleted;
  } catch (error) {
    throw Error("Error al buscar usuario / clase");
  }
};
