const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://grupo13:1234@alecluster.byyd4mp.mongodb.net/Aulaez",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//const mongoosePaginate = require('mongoose-paginate');

// Schema para user
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  mail: String,
  experiencia: String,
  password: String,
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
      comentarios: [
        {
          fecha: Date,
          calificacion: Number,
          mensaje: String,
          visto: Boolean,
          estado: String,
        },
      ],
    },
  ],
});

// Crear modelos basados en los esquemas
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
