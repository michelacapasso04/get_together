const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");

router.use(bodyParser.json());



router.get("/random",(req,res)=>{
  if(req.query.number&&/[0-9]+/.test(req.query.number)){
    let ids = "";
    let norepetition = new Array(req.query.number);
    for (let i = 0; i < req.query.number; i++) {
      let number = getRandomIntBetween(1, 325);
      if (norepetition.includes(number)) {
        i--;
      } else {
        ids += `${number}|`;
        norepetition[i] = number;
      }
    } 
    axios
      .get("https://api.punkapi.com/v2/beers" + `?ids=${ids}`)
      .then((response) => {
        let allrandom = response.data;
        allrandom = allrandom.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            tagline: obj.tagline,
            description: obj.description,
            image_url: obj.image_url,
            abv: obj.abv
          };
        });
        res.send(allrandom);
      })
      .catch((error) => {
        console.error(error);
        res.status(400);
      });
    }
    else{
      res
      .status(400)
      .send(
        "ERROR: missing searching parameter random: an integer");
    }
});
router.get("/:id",(req,res)=>{
  if(parseInt(req.params.id)!=NaN){
    axios
    .get("https://api.punkapi.com/v2/beers/"+req.params.id)
    .then((response) => {
      const obj = response.data[0];
      res.send(obj);
    })
    .catch((error) => {
      console.error(error);
      res.status(400);
    });
  }
  else res.status(400);
});

// ricerca birre
router.get("/", function (req, res) {
  const query = req.url;
  //ricerca birre per parametro tra food, abv_lt,  abv_gt, nome o stile
  if (
    req.query.food ||
    req.query.abv_lt ||
    req.query.abv_gt ||
    req.query.beer_name
  ) {
    axios
      .get("https://api.punkapi.com/v2/beers" + query)
      .then((response) => {
        let alldata = response.data;
        alldata = alldata.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            tagline: obj.tagline,
            description: obj.description,
            image_url: obj.image_url,
            abv: obj.abv,
          };
        });
        const number=req.query.number||3;
        res.send(alldata.slice(0,number));
      })
      .catch((error) => {
        console.error(error);
        res.status(400)
      });
  } else {
    res
      .status(400)
      .send(
        "ERROR: missing searching parameter. Please include in your request one of these parameters: food, abv_lt, abv_gt, beer_name. \n " +
          "Read the documentation  for more informations !!!"
      );
  }
});


function getRandomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
