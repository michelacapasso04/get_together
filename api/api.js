const express= require("express");
const router= express.Router();

const beers = require("./beers");
const cocktails = require("./cocktails");
const recipes = require("./recipes");
const wines = require("./wines");
const party= require("./party");

router.use("/beers", beers);
router.use("/cocktails", cocktails);
router.use("/wines", wines);
router.use("/recipes", recipes );
router.use("/party",party);

router.get("/docs",(req,res)=>{
    res.sendFile('docs.html', {root: __dirname });
});

module.exports= router;