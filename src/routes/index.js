const express = require("express");
const router = express.Router();
const Exp = require("../models/exps.js");
const mongoose = require("mongoose");

router.get("/", async (req, res) =>
{
    
    console.log();
    res.render("home", {});
});

router.get("/bd", async (req, res) =>
{
    const exps = await Exp.find();
    console.log(exps);
    res.render("index", {exps});
});

router.post("/add", async (req, res) =>
{   console.log(new Exp(req.body));
    const exp = new Exp(req.body);
    await exp.save();
    res.redirect("/bd");
});

router.post("/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    await Exp.updateOne({_id: id}, req.body);
    res.redirect("/bd");
});


router.get("/done/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.findById(id);
    exp.status = !exp.status;
    await exp.save();
    res.redirect("/bd");
});

router.get("/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.findById(id);
    res.render("edit", {exp});
});

router.get("/bd/delete/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.deleteOne({_id: id});
    res.redirect("/bd");
});

router.post('/db/submit', (req, res) => {
    const bd1 = req.body.db1; 
    const URI ='mongodb+srv://' + bd1 +
      ':HHnOQn2B4iVtEdOU@cluster0.pgfsbij.mongodb.net/exps?retryWrites=true&w=majority';
      console.log(bd1)
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
        res.redirect("/bd")
      });

// Exports
module.exports = router;