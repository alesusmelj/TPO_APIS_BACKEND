const mongoose = require("mongoose");
// Schema para user
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, min: 2 },
  apellido: { type: String, required: true, min: 2 },
  telefono: { type: String, required: true, min: 6 },
  mail: { type: String, required: true, unique: true, min: 6 },
  experiencia: String,
  password: { type: String, required: true, min: 8 },
  ubicacion: String,
  img: String,
  servicios: [
    {
      categoria: String,
      tipoClase: String,
      frecuencia: String,
      calificacion: Number,
      metodologia: String,
      costo: Number,
      duracion: Number,
      descripcion: String,
      activo: Boolean,
      contrataciones: [
        {
          mail: String,
          telefono: String,
          horario: String,
          motivo: String,
          estado: String,
          idNotificacion: String,
          descripcionServicio: String,
          idServicio: String

        },
      ],
      comentarios: [
        {
          fecha: Date,
          estrellas: Number,
          mensaje: String,
          visto: Boolean,
          estado: String,
          idNotificacion: String,
        },
      ],
    },
  ],
  notificaciones: [
    {
      tipo: String,
      estrellas: Number,
      estado: String,
      visto: Boolean,
      fecha: Date,
      descripcionServicio: String,
      motivo: String,
      mail: String,
      telefono: String,
      horario: String,
      idServicio: String,
      mensaje: String
    },
  ],
});

// Crear modelos basados en los esquemas
const User = mongoose.model("User", userSchema);

module.exports = User;
