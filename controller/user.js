const express = require("express");
const router = express.Router();

const db = require("../models/index");
const User = require("../models/index").User;
const Friendship = require("../models/index").Friendship;

const redirectToLogin = require("./session").redirectLogin;
const bodyParser = require("body-parser");
const Op = require("sequelize").Op;
//uso la funzione redirect login presa dal file controller session, per controllare che l'utente sia connesso
router.use(bodyParser.json());

//post che permette di aggiungere un amico passando un id di un utente

router.get("/info", async function(req, res){
  const userId = req.session.userId;
  try{
    const profile = await db.User.findOne({ raw: true, where: {id: userId}})
    const final = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      image: profile.image,
    }
    res.send(final);
  }catch(e){
    console.error(e);
  }

})

router.put("/update", async function(req, res){
  const userId = req.session.userId;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  try{
    let user = await User.findByPk(userId);
    if( name ){
      await user.update({firstName: name}).then(()=>{});
    }
    if (lastName) {
      await user.update({ lastName: lastName }).then(() => { });
    }
    if (email) {
      await user.update({ email: email }).then(() => { });
    }
    res.send(true);
  }catch(e){
    console.error(e);
  }
})


router.get("/search", async function(req, res){
  const userId = req.session.userId;
  const query = req.query.query;
  
  const mail = req.query.query.split("@")[0];
  const tot = req.query.query.split(" ");
  let users;
  try {
    if( tot.length > 1){
      const first = tot[0];
      const second = tot[1];
    users = await db.User.findAll({
      raw: true,
      where: {
        id: {
          [Op.ne]: userId,
        },
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${first}%`,
            },
            lastName: {
              [Op.iLike]: `%${second}%`,
            },
          },
          {
            firstName: {
              [Op.iLike]: `%${second}%`,
            },
            lastName: {
              [Op.iLike]: `%${first}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${mail}%`,
            },
          },
        ],
      },
      attributes: ["firstName", "lastName", "id", "image", "email"],
    });
  }else{
     users = await db.User.findAll({
      raw: true,
      where: {
        id: {
          [Op.ne]: userId,
        },
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${mail}%`,
            },
          },
        ],
      },
      attributes: ["firstName", "lastName", "id", "image", "email"],
    });
  }
    let i;
    for( i = 0; i < users.length; i++){
      const state = await Friendship.findOne({ where: {
        UserId: userId, 
        FriendId: users[i].id
      }})
      if( state )users[i].state = false;
      else if (!state) users[i].state = true;
    }
    res.send(users);
 } catch (e) {
    console.log(e);
    
  }
});

module.exports = router;
