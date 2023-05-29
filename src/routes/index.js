const express = require("express");
const router = express.Router();
const Exp = require("../models/exps.js");


router.get("/", async (req, res) =>
{
    const exps = await Exp.find();
    console.log(exps);
    res.render("index", {exps});
});

router.post("/add", async (req, res) =>
{   console.log(new Exp(req.body));
    const exp = new Exp(req.body);
    await exp.save();
    res.redirect("/");
});

router.post("/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    await Exp.updateOne({_id: id}, req.body);
    res.redirect("/");
});


router.get("/done/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.findById(id);
    exp.status = !exp.status;
    await exp.save();
    res.redirect("/");
});

router.get("/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.findById(id);
    res.render("edit", {exp});
});

router.get("/delete/:id", async (req, res) =>
{
    const {id} = req.params;
    const exp = await Exp.deleteOne({_id: id});
    res.redirect("/");
});


// Exports
module.exports = router;