const express = require("express");
const ContratacionController = require("../../controllers/contratacion.controller.js");
const { isTheSameUser, authorization } = require("../../auth/middlewares.js");

const router = express.Router();

router.put("/:id", authorization, ContratacionController.finalizarContratacion);

module.exports = router;
