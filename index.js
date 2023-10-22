// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require("mongoose");
// *Cargamos el fichero app.js con la configuración de Express
var app = require("./app");
// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor

var port = process.env.PORT || 4000;
// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos

mongoose
  .connect("mongodb+srv://grupo13:1234@alecluster.byyd4mp.mongodb.net/Aulaez", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "La conexión a la base de datos Aulaez se ha realizado correctamente"
    );
    app.listen(port, () => {
      console.log("servidor corriendo en http://localhost:" + port);
    });
  })
  .catch((err) => console.log(err));
