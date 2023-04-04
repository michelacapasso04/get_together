const express= require("express");
const router = express.Router();
const axios= require("axios");
const https= require("https");
const buildUrl=require("build-url");
require("dotenv").config();
const baseUrl=process.env["BASE_URL"]||"https://localhost:4000";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// random party
router.get('/random', function(req, res) {
  const query=req.query;
  const urlBeer=buildUrl(baseUrl+'/api/beers/random', {
    queryParams: {
      number: query.number_beer||3
    }
  });
  const urlCocktail=buildUrl(baseUrl+'/api/cocktails/random', {
    queryParams: {
      number: query.number_cocktail||3
    }
  });
  const urlRecipe=buildUrl(baseUrl+'/api/recipes/random', {
    queryParams: {
      number: query.number_recipe||3
    }
  });

  let request=[];
  request[0]=axios.get(urlRecipe, { httpsAgent });
  request[1]=axios.get(urlBeer, { httpsAgent });
  request[2]=axios.get(urlCocktail, { httpsAgent });

  axios.all(request)
  .then(axios.spread((...responses) => {
    const finalResponse={
      recipes: responses[0].data,
      beers: responses[1].data,
      cocktail: responses[2].data
    }
    res.json(finalResponse);
  })).catch(error=>{
    console.log(error);
    res.status(400).send(error);
  });
});

// party con parametri
router.get('/', (req, res) =>{
    const query=req.query;
    let keys=Object.keys(query);
    if(keys.legth>0){
      let obj_beer={};
      let obj_cocktail={};
      let obj_recipe={};

      keys.forEach((key)=>{
        let arr=key.split("_"); 
        if(arr[0]==="beer") {
          obj_beer[arr.slice(1).join("_")]=query[key];
        }
        else if(arr[0]==="recipe") {
          obj_recipe[arr.slice(1).join("_")]=query[key];
        }
        else if(arr[0]==="cocktail") {
          if(obj_cocktail.keys.lenght<1){
            obj_cocktail[arr.slice(1).join("_")]=query[key];
          }
        }
      });
      const urlBeer=buildUrl(baseUrl+'/api/beers', {
        queryParams: obj_beer
      });
      const urlCocktail=buildUrl(baseUrl+'/api/cocktails/'+obj_cocktail.keys[0], {
        queryParams: obj_cocktail
      });
      const urlRecipe=buildUrl(baseUrl+'/api/recipes', {
        queryParams: obj_recipe
      });

      let request=[];
      request[0]=axios.get(urlRecipe, { httpsAgent });
      request[1]=axios.get(urlBeer, { httpsAgent });
      request[2]=axios.get(urlCocktail, { httpsAgent });
    

      axios.all(request)
      .then(axios.spread((...responses) => {
        const number_beer=req.query.beer_number||3;
        const number_recipe=req.query.recipe_number||3;
        const number_cocktail=req.query.cocktail_number||3;
        const finalResponse={
          recipes: responses[0].data.slice(0,number_recipe),
          beers: responses[1].data.slice(0,number_beer),
          cocktail: responses[2].data.slice(0,number_cocktail)
        }
        
        res.json(finalResponse);
      })).catch(error=>{
        console.log(error);
        res.status(400);
      });
    }
    else{
      res.status(400).send("At least one parameter is required")
    }
});

module.exports = router;