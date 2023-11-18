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

exports.isLogged = async function (req, res) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token no proporcionado" });
  }

  try {
    const user = await UserService.findUserByToken(token);
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "No existe el usuario" });
  }

}

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


exports.updateUser = async function (req, res) {

  console.log({ "img": req.file })
  var User = {
    nombre: req.body.nombre ? req.body.nombre : null,
    apellido: req.body.apellido ? req.body.apellido : null,
    telefono: req.body.telefono ? req.body.telefono : null,
    ubicacion: req.body.ubicacion ? req.body.ubicacion : null,
    img: req.file ? req.file.buffer : null,
    mail: req.body.mail ? req.body.mail : null,
    experiencia: req.body.experiencia ? req.body.experiencia : null,
  };
  console.log(User)
  if (
    User.nombre &&
    User.apellido &&
    User.telefono &&
    User.mail
  ) {
    try {
      var updatedUser = await UserService.updateUser(User);
      return res.status(200).json({
        status: 200,
        data: updatedUser,
        message: "Succesfully Updated User",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e.message });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "Se deben ingresar los campos obligatorios",
    });
  }
};

exports.getUser = async function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token no proporcionado" });
  }

  try {
    const user = await UserService.findUserByToken(token);
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "No existe el usuario" });
  }
}