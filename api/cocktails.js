const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Random genera un array di lunghezza length di numeri casuali
//che vanno da 0 top (viene usata per non ricevere sempre gli stessi cocktail da cocktailDB)
function random(top, length) {
  let res = new Array(length);
  let i = 0;

  while (i < length) {
    let num = Math.floor(Math.random() * top);
    if (!res.includes(num)) {
      res[i] = num;
      i++;
    }
  }
  return res;
}

//Cleaner formatta il file JSON da restituire inserendo solo le info
//che ci interessano del cocktail
function cleaner(rawData, max) {
  //max indica il numero di cocktail che  l'utente vuole ricevere
  let totLength = rawData.drinks.length;
  let limit;
  // se il numero di cocktail restituito dal DB e' minore di max, allora ne restituisco
  // al massimo totLength ( ovvero tutti quelli disponibili )
  if (max > totLength) limit = totLength;
  else limit = max;

  let numbers = random(totLength, limit);
  let cleanDt = new Array(limit);
  let Ingredient = new Object();
  let Quantity = new Object();

  let cnt = 0;
  for (; cnt < limit; cnt++) {
    Ingredient = [];
    Quantity = [];
    let picked = numbers[cnt];
    let allRaw = rawData.drinks[picked];

    //Seleziono tutti gli ingredienti e li metto in un array
    let regex = "strIngredient";
    let i = 0;
    for (property in allRaw) {
      if (property.substring(0, 13) === regex && allRaw[property] != null) {
        Ingredient.push(allRaw[property]);
        i++;
      }
    }

    //Seleziono tutte le quantita' di ogni singolo ingrediente e le metto in un array
    regex = "strMeasure";

    i = 0;
    for (property in allRaw) {
      if (property.substring(0, 10) === regex && allRaw[property] != null) {
        Quantity.push(allRaw[property]);
        i++;
      }
    }

    //Costruisco l-oggetto JSON che pero' deve essere 'pulito',
    // infatti si crea un array di array
    cleanDt[cnt] = rawData.drinks
      .filter((x) => x === allRaw)
      .map((data) => {
        return {
          cocktailID: data.idDrink,
          cocktailName: data.strDrink,
          cocktailCat: data.strCategory,
          cocktailType: data.strAlcoholic,
          instructions: data.strInstructions,
          photo: data.strDrinkThumb,
          Ingredients: Ingredient,
          Quantity: Quantity,
        };
      });
  }

  //pulisco l'array generato ( CleanDt ) creando un oggetto con una chiave 'drinks'
  //e come valore un array di cocktail da restituire
  let tmp = new Array();
  let i = 0;
  for (; i < limit; i++) {
    tmp[i] = cleanDt[i][0];
  }
  let cleanData = { drinks: tmp };
  return cleanData;
}

//works
router.get("/type", function (req, response) {
  const q = req.query;
  var num = q.number;
  if (!num) num = 3;
  var type = q.type;
  //Prendo prima tutti i cocktail con type ( il JSON di risposta contiene solo l'id del cocktail e poco altro)

  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + type)
    .then(function (res) {
      let resId = cleaner(res.data, num);

      ////////////////////////////////////
      let x = resId.drinks.length;

      var ids = new Array();
      var array = new Array();
      var ress = new Array();
      let i = 0;
      for (; i < x; i++) ids.push(resId.drinks[i].cocktailID);

      i = 0;
      //Ora prendo gli id restituiti dalla prima get,
      //e creo un array di promise con 'array.push(axios.get(url));'
      for (; i < x; i++) {
        let url =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }
      //Chiamo le promise con axios.all e mi scorro responses che e' un array che contiene tutte le
      //risposte, ognuna proveniente da una singola chiamata e che si trova in responses[i]
      axios
        .all(array)
        .then(
          axios.spread((...responses) => {
            let i;
            for (i = 0; i < x; i++) {
              ress.push(responses[i].data.drinks[0]);
            }
            //Creo l'oggetto finale e ci chiamo cleaner
            let finalRaw = { drinks: ress };
            let final = cleaner(finalRaw, num);
            response.send(final);
          })
        )
        .catch(function (error) {
          console.error(error);
          res.status(400);
        });
      //////////////////////////////////////////
    })
    .catch(function (error) {
      console.error(error);
      res.status(400);
    })
    .finally(function (final) {});
});

router.get("/random", function (req, response) {
  const q = req.query;
  var num = q.number;
  if (!num) num = 3;
  ////////////////////////////////////

  var array = new Array();
  var ress = new Array();
  let i = 0;
  i = 0;

  //Faccio num chiamate random, dato che il server cocktailDB mi restituisce un solo cocktail
  //Per far ele chiamate uso le promise e axios.all.
  for (; i < num; i++) {
    let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    array.push(axios.get(url));
  }

  axios
    .all(array)
    .then(
      axios.spread((...responses) => {
        let i;
        for (i = 0; i < num; i++) {
          ress.push(responses[i].data.drinks[0]);
        }
        let finalRaw = { drinks: ress };
        let final = cleaner(finalRaw, num);
        response.send(final);
      })
    )
    .catch(function (error) {
      console.error(error);
      res.status(400);
    });
  //////////////////////////////////////////
});

//works
router.get("/name", function (req, response) {
  const q = req.query;
  var num = q.number;
  if (!num) num = 3;
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + q.name)
    .then(function (res) {
      let result = cleaner(res.data, num);
      response.send(result);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400);
    })
    .finally(function (final) {});
});

//works
router.get("/category", function (req, response) {
  const q = req.query;
  var num = q.number;
  if (!num) num = 3;
  axios
    .get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + q.category
    )
    .then(function (res) {
      let resId = cleaner(res.data, num);

      ////////////////////////////////////
      let x = resId.drinks.length;

      var ids = new Array();
      var array = new Array();
      var ress = new Array();
      let i = 0;
      for (; i < x; i++) ids.push(resId.drinks[i].cocktailID);

      i = 0;

      for (; i < x; i++) {
        let url =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }

      axios
        .all(array)
        .then(
          axios.spread((...responses) => {
            let i;
            for (i = 0; i < x; i++) {
              ress.push(responses[i].data.drinks[0]);
            }
            let finalRaw = { drinks: ress };
            let final = cleaner(finalRaw, num);
            response.send(final);
          })
        )
        .catch(function (error) {
          console.error(error);
          res.status(400);
        });
      //////////////////////////////////////////
    })
    .catch(function (error) {
      console.error(error);
      res.status(400);
    })
    .finally(function (final) {});
});

//works
router.get("/ingredient", function (req, response) {
  const q = req.query;
  var num = q.number;
  if (!num) num = 3;
  axios
    .get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + q.ingredient
    )
    .then(function (res) {
      let resId = cleaner(res.data, num); // contiene la risposta del server con i drink in forma di id

      ////////////////////////////////////
      let x = resId.drinks.length;

      var ids = new Array(); //ci metto tutti gli id per creare gli url da mettere nelle promise
      var array = new Array(); //conterra' le promises per axios.all
      var ress = new Array(); //array che contiene tutti i drink ma che devono essere passati in cleaner

      let i = 0;
      for (; i < x; i++) ids.push(resId.drinks[i].cocktailID);

      i = 0;

      for (; i < x; i++) {
        let url =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }

      axios
        .all(array)
        .then(
          axios.spread((...responses) => {
            let i;
            for (i = 0; i < x; i++) {
              ress.push(responses[i].data.drinks[0]);
            }
            let finalRaw = { drinks: ress }; // contiene i drink nel formato accettato da cleaner
            let final = cleaner(finalRaw, num); //valore finale
            response.send(final);
          })
        )
        .catch(function (error) {
          console.error(error);
          res.status(400);
        });
      //////////////////////////////////////////
    })
    .catch(function (error) {
      console.error(error);
      res.status(400);
    })
    .finally(function (final) {});
});

router.get("/:id", function (req, response) {
  if(parseInt(req.params.id)!=NaN){
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + req.params.id)
      .then(function (res) {
        if(res.data.drinks!=null){
          let result = cleaner(res.data, 1);
          response.send(result);
        }
        else response.status(400).end();
      })
      .catch(function (error) {
        console.error(error);
        response.status(400).end();
      })
      .finally(function (final) {});
    }else response.status(400).end();
});

module.exports = router;
