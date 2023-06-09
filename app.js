const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();



// Configuración de la aplicación Express
const app = express();
const indexRoutes = require("./src/routes/index");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/", indexRoutes);






// // Ruta para renderizar los datos en la página
// app.get("/", (req, res) => {
  //   // Recupera los datos de MongoDB
  //   Formulario.find({}, (error, formularios) => {
    //     if (error) {
      //       console.log("Error al recuperar los datos:", error);
      //       res.status(500).send("Error al recuperar los datos");
      //     } else {
        //       res.render("index", { formularios: formularios });
        //     }
        //   });
        // });
        
        // Start server (type: npm run dev)
        app.listen(app.get("port"), () =>
        {
          console.log("Server on port " + app.get("port"));
        });
        
        const inquirerPromise = import('inquirer');

        inquirerPromise
          .then(inquirerModule => {
            const inquirer = inquirerModule.default;

        inquirer.prompt([
          {
            type: 'input',
            name: 'uri',
            message: 'Ingrese el URI de conexión a la base de datos:'
          }
        ])
        .then(answers => {
        const uri = answers.uri;
        const URI = MONGODB_URI='mongodb+srv://'+uri+':HHnOQn2B4iVtEdOU@cluster0.pgfsbij.mongodb.net/exps?retryWrites=true&w=majority'
        
        // Conexión a MongoDB
        mongoose.connect(URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
          .then(() => {
            console.log("Conexión exitosa a la base de datos");
          })
          .catch(error => {
            console.log("Error al conectar a la base de datos:", error);
          });
        });
      })
        .catch(error => {
          console.log("Error al importar el módulo inquirer:", error);
        });