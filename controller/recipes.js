const express= require("express");
const router= express.Router();
const User = require("../models/index").User;
const Recipe = require("../models/index").Recipe;
const axios= require("axios");
const { Op } = require("sequelize");
//ottieni tutte le ricette aggiunte dall'utente corrente
router.get("/",async (req,res)=>{
  try{
    const userId=req.session.userId;
    const recipes = await (await User.findByPk(userId)).getRecipes();
    res.send(recipes);
  }catch(e){
    const errObj={
        name: e.name,
        detail: e.parent.detail,
        code: e.parent.code
    }
    console.log(errObj);
    res.status(400).send(errObj);
  };
});

//ottiene tutte le ricette aggiunte dai tuoi amici
router.get("/friends",async (req,res)=>{
  try{
    let userFriends= await (await User.findByPk(req.session.userId)).getFriends({attributes:['id']});
    userFriends = userFriends.map((el)=>{
      return el.id
    });
    console.log("I tuoi amici: ",userFriends);
    
    const recipes = await Recipe.findAll({
      where:{
        id:{
          [Op.in]: userFriends
        } 
      }
    });
    console.log(recipes);
    res.send(recipes);
  }catch(e){
    const errObj={
        name: e.name,
        detail: e.parent.detail,
        code: e.parent.code
    }
    console.log(errObj);
    res.status(400).send(errObj);
  };
});

//ottiene una ricetta nel db
router.get("/:id",async (req,res)=>{
  try{
    const recipe=await Recipe.findByPk(req.params.id);
    res.send(recipe);
  }catch(e){
    const errObj={
        name: e.name,
        detail: e.parent.detail,
        code: e.parent.code
    }
    console.log(errObj);
    res.status(400).send(errObj);
  };
});

router.delete("/:id",async (req,res)=>{
  try{
    await Recipe.destroy({
      where:{
        id:req.params.id
      }
    });
    res.status(200).end();
  }catch(e){
    console.error(e);
    
    res.status(400).send(e);
  };
});

// Possibilità di aggiungere una ricetta al database:
router.post("/",async (req,res)=>{
  console.log("aggiungo una ricetta");
  
  //prendi i dati dal body
    let data=req.body;
    //se è una ricetta presa da un sito web
    if(data.sourceUrl){
      //controllo che siano presenti alcuni campi obbligatori
      if(!data.dishTypes) res.status(400).send({message:"missing dishTypes params"}).end();
      else if(!data.cuisines) res.status(400).send({message:"missing cuisines params"}).end();
      else if(!data.leng) res.status(400).send({message:"missing leng params"}).end();
      else{
        //faccio una richiesta a spoonacular per fare il parsing della ricetta
        axios.get(`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.SPOONACULAR_KEY}&url=${data.sourceUrl}&forceExtraction=true`)
        .then(async (response)=>{
          //prendo il risultato e costruisco un oggetto da mettere nel database
          const ricetta= response.data;
          const obj={
            UserId: req.session.userId,
            title: ricetta.title,
            image: ricetta.image,
            readyInMinutes: ricetta.readyInMinutes,
            servings: ricetta.servings,
            sourceUrl: ricetta.sourceUrl,
            dishTypes: new Array(data.dishTypes),
            cuisines: data.cuisines,
            diets: data.diets,
            summary: (ricetta.summary!=null)?ricetta.summary:(ricetta.instructions),
            instructions: ricetta.instructions,
            extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
              return {originalString: el.originalString, amount: el.amount,  unit: el.unit, measures: el.measures}
            }),
            analyzedInstructions: ricetta.analyzedInstructions,
            leng: data.leng,
            type: "user_recipe"
          }
          const recipe=await Recipe.build(obj);
          recipe.UserId=req.session.userId;
          await recipe.save();
          const curr_user=await User.findByPk(req.session.userId);
          await curr_user.addRecipe(recipe);
          //ritorno quello che ho aggiunto
          res.json(recipe);
        })
        .catch((error)=>{
          console.error(error);
          res.status(400).send(error);
        });
      }
    }
    else{
      //Controllo che ci siano tutti i parametri richiesti
      if(!data.title) res.status(400).send({message:"missing title params"}).end();
      else if(!data.image) res.status(400).send({message:"missing image params"}).end();
      else if(!data.readyInMinutes) res.status(400).send({message:"missing readyInMinutes params"}).end();
      else if(!data.servings) res.status(400).send({message:"missing servings params"}).end();
      else if(!data.dishTypes) res.status(400).send({message:"missing dishTypes params"}).end();
      else if(!data.cuisines) res.status(400).send({message:"missing cuisines params"}).end();
      else if(!data.diets) res.status(400).send({message:"missing diets params"}).end();
      else if(!data.summary) res.status(400).send({message:"missing summary params"}).end();
      else if(!data.extendedIngredients) res.status(400).send({message:"missing extendedIngredients params"}).end();
      else if(!data.analyzedInstructions) res.status(400).send({message:"missing analyzedInstructions params"}).end();
      else if(!data.leng) res.status(400).send({message:"missing leng params"}).end();
      else{
        data.type="user_recipe"  
        data.UserId=req.session.userId;
        //TODO summary: su un'unica stringa
        await Recipe.create(data);
        const curr_user=await User.findByPk(req.session.userId);
        await curr_user.setRecipes(recipe);
        console.log(data);
        res.status(200).json(data);
      }
    }
  } 
);


module.exports= router;