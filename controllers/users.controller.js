var UserService = require("../services/user.service");

exports.loginUser = async function (req, res) {
  let user = { mail: req.body.mail, password: req.body.password };

  try {
    const loginUser = await UserService.loginUser(user);
    if (loginUser === 0)
      return res.status(400).json({ message: "Error en la contraseña" });
    else
      return res.status(201).json({ loginUser, message: "Succesfully login" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Invalid username or password" });
  }
};

exports.createUser = async function (req, res) {
  const { mail, nombre, apellido, telefono, password } = req.body;

  const user = {
    mail: mail,
    password: password,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
  };
  try {
    const createdUser = await UserService.createUser(user);
    return res
      .status(201)
      .json({ createdUser, message: "Succesfully created user" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "User Creation was Unsuccesfull" });
  }
};

exports.updateUser = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.mail) {
    return res.status(400).json({ status: 400, message: "mail be present" });
  }

  var User = {
    nombre: req.body.nombre ? req.body.nombre : null,
    apellido: req.body.apellido ? req.body.apellido : null,
    telefono: req.body.telefono ? req.body.telefono : null,
    ubicacion: req.body.ubicacion ? req.body.ubicacion : null,
    imagen: req.body.imagen ? req.body.imagen : null,
    mail: req.body.mail ? req.body.mail : null,
    password: req.body.password ? req.body.password : null,
    experiencia: req.body.experiencia ? req.body.experiencia : null,
  };
  if (
    User.nombre &&
    User.apellido &&
    User.telefono &&
    User.mail &&
    User.password
  ) {
    try {
      var updatedUser = await UserService.updateUser(User);
      return res
        .status(200)
        .json({
          status: 200,
          data: updatedUser,
          message: "Succesfully Updated User",
        });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e.message });
    }
  } else {
    return res
      .status(400)
      .json({
        status: 400,
        message: "Se deben ingresar los campos obligatorios",
      });
  }
};
