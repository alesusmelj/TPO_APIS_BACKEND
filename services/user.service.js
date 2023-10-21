const { User } = require("../models/User.model");

const nuevoUser = new User({
  nombre: "Juan Martin",
  apellido: "Caceres",
  telefono: "1234567810",
  mail: "proveedor1@example.com",
  experiencia:
    "Como tutor experimentado, comprendo las necesidades únicas de mis estudiantes. Mi objetivo es proporcionar un ambiente de aprendizaje enriquecedor y estimulante.",
  password: "password1",
  ubicacion: "Rosario",
  img: "https://img.freepik.com/fotos-premium/hombre-guapo-pelo-corto-sobre-fondo-gris_251136-30459.jpg?size=626&ext=jpg&ga=GA1.2.88060135.1696466475&semt=ais",
  servicios: [
    {
      categoria: "Inglés",
      tipoClase: "Grupal",
      frecuencia: "Mensual",
      calificacion: 3.3,
      metodologia: "Ambas",
      costo: 2900,
      duracion: 1,
      descripcion:
        "Mejora tus habilidades en el idioma inglés con mis clases en línea. Trabajaremos en gramática, vocabulario y conversación para que te sientas más seguro y fluido en este idioma tan importante.",
      activo: true,
      comentarios: [
        {
          fecha: "2023-06-02T15:29:26",
          calificacion: 4.3,
          mensaje: "Quisquam etincidunt adipisci dolor numquam non.",
          visto: true,
          estado: "Aceptado",
        },
      ],
    },
  ],
});

nuevoUser.save();

//     (error) => {
//   if (error) {
//     console.error('Error al guardar el user:', error);
//   } else {
//     console.log('User guardado exitosamente.');
//   }
// });
