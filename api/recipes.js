const express= require("express");
const bodyParser=require("body-parser");
const axios= require("axios");
require("dotenv").config();
const Recipe= require("../models/index").Recipe;
const User= require("../models/index").User;

const router = express.Router();

router.use(bodyParser.json());

//TODO extended ingredients
//ricerco spoonacular cuisine diets intolerances
router.get('/', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/recipes/complexSearch${query}&instructionsRequired=true&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let result=response.data.results;
    result=result.map((ricetta)=>{
      let obj= {
        id: ricetta.id,
        title: ricetta.title,
        image: ricetta.image,
        readyInMinutes: ricetta.readyInMinutes,
        servings: ricetta.servings,
        sourceUrl: ricetta.sourceUrl,
        dishTypes: ricetta.dishTypes,
        cuisines: ricetta.cuisines,
        diets: ricetta.diets,
        instructions: ricetta.instructions,
        // extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
        //   return {originalString: el.originalString, amount: el.amount,  unit: el.unit, measures: el.measures}
        // }),
        analyzedInstructions:ricetta.analyzedInstructions,
        summary: ricetta.summary,
        leng: "en",
        type: "api_recipe"
      }
      return obj
    });
    //ritorno quello che ho trovato
    res.json(result);
  })
  .catch((error)=>{
    console.error(error);
    res.status(400).end(error);
  });
});

  

//ricerco ricette spoonacular random, per tags
router.get('/random', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/recipes${query}&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let result=response.data.recipes;
    result=result.map((ricetta)=>{
      let obj= {
        id: ricetta.id,
        title: ricetta.title,
        image: ricetta.image,
        readyInMinutes: ricetta.readyInMinutes,
        servings: ricetta.servings,
        sourceUrl: ricetta.sourceUrl,
        dishTypes: ricetta.dishTypes,
        cuisines: ricetta.cuisines,
        diets: ricetta.diets,
        extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
          return {originalString: el.originalString, amount: el.amount,  unit: el.unit, measures: el.measures}
        }),
        analyzedInstructions:ricetta.analyzedInstructions,
        summary: ricetta.summary,
        leng: "en",
        type: "api_recipe"
      }
      return obj
    });
    //ritorno quello che ho trovato
    res.json(result);
  })
  .catch((error)=>{
    console.error(error);
    res.status(400).end(error);
  });
});

router.get('/:id', function(req, res) {
  
  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let ricetta=response.data;
    let obj= {
      id: ricetta.id,
      title: ricetta.title,
      image: ricetta.image,
      readyInMinutes: ricetta.readyInMinutes,
      servings: ricetta.servings,
      sourceUrl: ricetta.sourceUrl,
      dishTypes: ricetta.dishTypes,
      cuisines: ricetta.cuisines,
      diets: ricetta.diets,
      extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
        return {originalString: el.originalString, amount: el.amount,  unit: el.unit, measures: el.measures}
      }),
      analyzedInstructions:ricetta.analyzedInstructions,
      summary: ricetta.summary,
      leng: "en",
      type: "api_recipe"
    }
    console.log(obj);
    res.send(obj);
  }).catch(e=>{
    console.error(e);
    res.status(400);
  });
});

module.exports = router;
