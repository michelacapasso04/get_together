const express= require("express");
const router = express.Router();
const axios=require("axios");

router.get('/pairing', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/food/wine${query}&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    const result=response.data;
    const obj={
      pairingText: result.pairingText,
      wines: result.productMatches
    }
    res.send(obj);
  }).catch(e=>{
      console.log(e);
      res.status(400);
  });
});
router.get('/recommendation', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/food/wine${query}&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let result=response.data;
    const obj={
      pairingText: null,
      wines: result.recommendedWines
    }
    res.send(obj);
  }).catch(e=>{
    console.error(e);
    res.status(400);
  });
});

router.get("/:id",(req,res)=>{
  if(parseInt(req.params.id)!=NaN){
    axios.get(`https://api.spoonacular.com/food/products/${req.params.id}?apiKey=${process.env.SPOONACULAR_KEY}`)
    .then((response)=>{
    let result=response.data;
    const obj={
        id: result.id,
        title: result.title,
        price: result.price,
        nutrition: result.nutrition,
        description: result.description,
        image: result.images[1]
      }
      res.send(obj);
    }).catch(e=>{
      console.error(e);
      res.status(400);
    });
  }
});

module.exports = router;