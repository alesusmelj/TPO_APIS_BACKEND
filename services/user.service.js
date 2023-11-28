var User = require("../models/User.model");
const CloudinaryService = require("./cloudinary.service");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async function (user) {
  try {
    const userBd = await User.findOne({ mail: user.mail });
    if (userBd == undefined) return 0;
    const passwordIsValid = bcrypt.compareSync(user.password, userBd.password);
    if (!passwordIsValid) return 0;

    const token = jwt.sign({ id: userBd._id }, process.env.TOKEN_SECRET);

    return { token: token, user: userBd };
  } catch (error) {
    throw Error(e);
  }
};

exports.createUser = async function (user) {
  user.password = bcrypt.hashSync(user.password, 8);
  const newUser = new User(user);
  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    console.log(error);
    throw Error("Error while Creating User");
  }
};

exports.updateUser = async function (user) {
  var id = { mail: user.mail };
  var urlImg;
  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }

  if (user.img) {
    try {
      urlImg = await CloudinaryService.uploadImage(user.img);
      oldUser.img = urlImg;
    } catch (e) {
      console.error(e);
      throw Error("Error occured while uploading to Cloudinary.");
    }

  }

  oldUser.nombre = user.nombre;
  oldUser.mail = user.mail;
  oldUser.apellido = user.apellido;
  oldUser.telefono = user.telefono;
  oldUser.ubicacion = user.ubicacion;

  oldUser.experiencia = user.experiencia;
  try {
    var savedUser = await oldUser.save();

    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

exports.findUserByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;
    return await User.findOne({ _id: userId });
  } catch (error) {
    throw Error("Error finding user");
  }

};
