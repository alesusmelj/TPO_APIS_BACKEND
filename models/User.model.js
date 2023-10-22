const mongoose = require("mongoose")
// Schema para user
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, min: 2, },
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

module.exports = User