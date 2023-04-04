const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const UserParty = require("../models/index").UserParty;
const Recipe = require("../models/index").Recipe;
const Friendship = require("../models/index").Friendship;
const Party = require("../models/index").Party;
const PartyRecipe = require("../models/index").PartyRecipe;
const Comment = require("../models/index").Comment;
const notificate = require("./notifications").notificate;
const broadcast = require("./notifications").broadcast;
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

//ritorna tutti i party dell'utente corrente
router.get("/", async (req, res) => {
  try{
    const user= await User.findByPk(req.session.userId);
    const party= await user.getParties({
      raw: true,
      where: {
        owner: req.session.userId
      }
    
    });
    res.send(party);
  }
  catch(e){
    console.log(e);
    res.status(400).end();
  }
});

//ritorna tutti i parties a cui l'utente è stato invitato
router.get("/other", async (req, res) => {
  try{
    const user= req.session.userId;
    const userparty=await UserParty.findAll({
      raw: true,
      where:{
        UserId:user,
        status:'accepted'
      }
    });
    let party=[];
    for(el in userparty){
      party.push(await Party.findOne({
        raw: true,
        where:{
          id: userparty[el].PartyId,
          owner: {[Op.ne]: req.session.userId}
        }
       })
      );
    console.log(userparty[el].PartyId);
    }
    for(el in party){
      if(party[el]==null){
        party.splice(el, 1);
      }
    }
    res.send(party);
  }
catch(e){
  console.log(e);
  res.status(400).end();
}
});

//aggiungi un party
router.post("/", async (req, res) => {
  sourceId = req.session.userId;
  try {
    const ownerObj = await User.findOne({ where: { id: sourceId } });
    const apiRecipes=req.body.recipes.filter(el=>el.type==="api_recipe");
    const userRecipes=req.body.recipes.filter(el=>el.type==="user_recipe");
    console.log(apiRecipes,userRecipes);
    const party = await Party.create({
      name: req.body.name,
      owner: sourceId,
      wines: req.body.wines,
      cocktails: req.body.cocktails,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      apiRecipes: apiRecipes,
      beers: req.body.beers
    });
    userRecipes.forEach(async el=>{
        const recipe= await Recipe.findByPk(el.id);
        await party.addUserRecipe(recipe);
    });

    let people = req.body.partecipants;
    //req.body.partecipants.forEach(async (el) => {
    let i = 0;
    await party.addUser(ownerObj, { through: { status: "accepted" } });
    for (; i < people.length; i++) {
      console.log(people[i]);
      const friend = await User.findOne({ where: { id: people[i] } });
      await party.addUser(friend, { through: { status: "pending" } });
    }
    for (i = 0; i < people.length; i++) {
      let not = {
        source: sourceId,
        destination: people[i],
        party: party.id,
        event: "newInvitation",
        comment: 0,
        state: true,
      };
      notificate(not);
    }
    // /broadcast(not);
    res.send(party);
  } catch (e) {
    const errObj = {
      name: e
      //detail: e.parent.detail,
      //code: e.parent.code,
    };
    console.log(errObj);
    res.status(400).send(e);
  }
});

//ottieni il party con id e carica tutti i commenti e le info relative
router.get("/:id", async function (req, res) {
  const partyId = req.params.id;
  try {
    //const comments = await Party.getComments(partyId); //Devo fare una chiamata al db che ritorna tutti i commenti relativi ad un party
    let party = await Party.findOne({
      //raw: true,
      where: { 
        id: partyId
      },
      include: [
        {
          // Notice `include` takes an ARRAY
          model: User,
          attributes: ["firstName","lastName", "id", "email"],
        },
        {
          model: Comment,
          attributes: ["id", "UserId", "text", "createdAt"],
          include: [{
            model: User,
            attributes: ["firstName","lastName", "id", "email"],
        }],
        },
        {
          model: Recipe,
          as:"userRecipes",
          attributes: { exclude: ['PartyRecipe'] }
        }
      ],
      
    });
    if(!party){
      console.log("Not found");
      res.status(404).end();
    }
    else{
      let isOwner = false;
      if(req.session.userId == party.owner){
        isOwner=true;
      } 

      party["dataValues"]["isOwner"] = isOwner;
      party=party.toJSON();
      party["Comments"].forEach(x=>{
        if(x.UserId == req.session.userId){
          x.mycomm=true;
        }
        else{
          x.mycomm=false;
        }
      })
      party.owner= (await User.findOne({where:{id: party.owner},attributes:["firstName","lastName","email"]})).toJSON();
      let response = party;
      console.log(party);
      
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});
//modifica il party con id
router.put("/:id", async (req, res) => {
    const changes=req.body;
    const party= await Party.findByPk(req.params.id);

    party.name=changes.name;
    party.startDate=changes.startTime;
    party.finishDate=changes.finishTime;
    party.apiRecipes=changes.apiRecipes;
    party.wines=changes.wines;
    party.beers=changes.beers;
    party.cocktails=changes.cocktails;
  
    await PartyRecipe.destroy({where:{PartyId:party.id}});
    for(el in changes.userRecipes){
      party.addRecipes(Recipe.findByPk(el.id));
    }

    await party.save();
    res.send(party);

});

//elimina il party con id
router.delete("/:id",async (req,res)=>{
  try{
    await Party.destroy({
      where:{
        id:req.params.id
      }
    });
    res.status(200);
  }
  catch(e){
    console.error(e);
    res.status(400).end();
  }
});


//aggiunge un commento
router.post("/:id/comment", async function (req, res) {
  const sourceId = req.session.userId;
  const commentTxt = req.body.commentTxt;
  const partyId = req.params.id;
  let newCommObj = {
    text: commentTxt,
    PartyId: partyId,
    UserId: sourceId,
  }
  try {
    let newComm = await Comment.create(newCommObj);
    let not = {
      source: sourceId,
      party: partyId,
      event: "newComment",
      comment: newComm.id,
      state: true,
    };
    broadcast(not);
    newComm=newComm.toJSON();
    const user=await User.findOne({
      where:{id:newComm.UserId},
      attributes: ["firstName","lastName", "id", "email"]
    });
    newComm.User=user.toJSON();
    res.send(newComm);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }

});

router.post("/response", async function (req, res) {
  const partyId = req.body.id;
  const partecipantId = req.session.userId;
  const decision = req.body.decision;
  try {
    const person = await UserParty.findOne({
      //raw: true,
      where: { UserId: partecipantId, PartyId: partyId },
    });
    // Check if record exists in db
    console.log(person);
    if (person.status == "pending") {
      person.status = decision;
      person.save().then(function () {});
    }
      if (decision == "accepted") {
        const not = {
          source: partecipantId,
          party: partyId,
          event: "joined",
          comment: 0,
          state: true,
        };
        console.log(decision);
        await broadcast(not);
      }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});



module.exports = router;
