const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
let sockets = require("../index").sockets;
const Notification = require("../models/index").Notification;
const UserParty = require("../models/index").UserParty;
const User = require("../models/index").User;
const Party = require("../models/index").Party;
const Comment = require("../models/index").Comment;
const io = require("../index").io;

router.delete("/delete/all", async function(req, res){
  const userId = req.session.userId;
  try{
    await Notification.destroy({ where: { destination: userId } });
    res.end();
  }catch(e){
    console.error(e);
    res.status(400).end();
  }
});

router.get("/all", async function(req, res){
  const userId = req.session.userId;
     try {
       let nots = await Notification.findAll({
         raw: true,
         where: { destination: userId },
         order: [["createdAt", "DESC"]],
       });
       if (!nots) res.send(false);
       else {
         let i;
         let final = new Array();
         for (i = 0; i < nots.length; i++) {
           let not = await createNotification(nots[i]);
           not.time = nots[i].createdAt;
           not.id = nots[i].id;
           console.log(not.id);
           not.state = nots[i].state;
           console.log(not);
           final.push(not);
         }
         res.send(final);
       }
     } catch (e) {
       console.error(e);
       res.status(400).end();
     }
})

router.post("/mark", async function(req, res){
  const userId = req.session.userId;
  const id = req.body.id;
  try{
    let not = await Notification.findByPk(id);
    if( not ){
      not.state = false;
      not.update({ state: false }).then((res)=>{});
      not.save();
    }
    res.end();

  }catch(e){
    console.error(e);
    res.status(400).end();
  }
})

router.post("/destroy", async function(req, res){
  const notId = req.body.id;
  try{
    await Notification.destroy({ where: {id: notId}});
    res.status(200).end();
  }catch(e){
    console.error(e);
    res.status(400).end();
  }
})

io.on("connection", function (socket) {
  let currentId;
  if (!socket.handshake.session.userId) socket.disconnect();
  else {
    currentId = socket.handshake.session.userId;

    check(socket, currentId);

    socket.on("ack", function (event) {
      let notId = event.notificationId;
      Notification.findOne({
        where: { id: notId },
      }).then(function (notification) {
        // Check if record exists in db
        if (notification) {
          notification.update({
            state: false,
          });
        }
      });
    });

    socket.on("disconnect", () => {
      let currObj = sockets.filter((x) => x.clientId != currentId);
      sockets = currObj;
    });
  }
});

async function notificate(event) {
  //console.log("event---->notficate: ", event);
  try {
    //Mi trovo il nome della sorgente della notifica
    let not = await createNotification(event);
    //Creo un oggetto da inviare come notifica che non contiene gli Id
    //ma solo il nome della source e altre info
    

    //  SE LA NOTIFCA NON E' RELATIVA AD UN PARTY COSA SUCCEDE??? IL PARTY NON SI TROVA E...???
    Notification.create(event).then((toSend) => {
      //Controllo che il client sia nell'array di socket e abbia una socket attiva

      not.id = toSend.id;
      not.time = toSend.createdAt;
      console.log("Final not:  ", not);
      let dstId = event.destination;
      let dstSock = sockets.filter((x) => x.clientId == dstId)[0];
      //console.log("dstId:  ", dstId);
      //In caso positivo invio la notifica e la aggiorno nel db come false, ovvere non da leggere
      if (dstSock != undefined) {
        // Manca ack che il client abbia ricevuto la notifica
        io.to(dstSock.socket.id).emit(not.event, not);
        //console.log("dstId:  ", dstId);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function check(socket, currentId) {
  io.to(socket.id).emit("welcome", currentId);

  //controllo se il client e' gia' nell'array di connessioni
  sockets.push({ clientId: currentId, socket: socket });

  console.log("sockets in connessione/reload---->: ", sockets);

  //Controllo se il client che si connette ha notifiche in sospeso e gliele invio.
  try {
    const notRead = await Notification.findAll({
      raw: true,
      where: { destination: currentId, state: true },
    });
    let i = 0;
    //console.log(notRead);
    let len = notRead.length;
    for (i = 0; i < len; i++) {
      let n = notRead[i];
      let e = n.event;
      var notId = n.id;
      // Mi devo prendere il nome del party e della sorgente del commento:
      const not = await createNotification(n);
      // Manca ack che il client abbia ricevuto la notifica
      console.log(socket.id);
      io.to(socket.id).emit(e, not);
      
    }
  } catch (error) {
    console.error(error);
  }
}

function broadcast(event) {
  let partyId = event.party;
  let userId = event.source;
  let e = event.event;
  UserParty.findAll({
    raw: true,
    where: {
      PartyId: partyId,
      UserId: { [Op.ne]: userId },
      status: "accepted",
    },
  }).then((array) => {
    //console.log("array: ", array);
    let i;
    for (i = 0; i < array.length; i++) {
      let not = {
        source: userId,
        destination: array[i].UserId,
        event: e,
        comment: event.comment,
        party: partyId,
        state: true,
      };
      //console.log(array[i]);
      notificate(not);
    }
  });
}

/*------- LEGENDA EVENTI---------

1. newComment: ogni qual volta un utente scrive un nuovo messaggio relativo ad un party emette l'evento 
              che viene inviato in broadcast poi a tutti i componenti del party 

2. newCommentOn: evento che viene generato dal server per tutti coloro che si trovano sulla pagina effettiva del party cosi che possono visualizzare informazioni sul commento in tempo reale 

3. newInvitation: evento che segnala un invito ad un party 
    3.1 deny: non succede nulla 
    3.2 joined: l'utente ha deciso di partecipare e quindi viene inviata una notifica in broadcast a tutti i componenti del party 

4. newFriend: evento che si genera quando si invia una richiesta di amicizia
    4.1 deny: non succede nulla
    4.2 joined: l'utente ha accettato l'amicizia e quindi viene aggiunto un'amicizia in Friendship


    let data = {
        source: n.source,
        destination: currentId,
        event: e,
        party: n.party,
        state: true,
      };

*/

async function createNotification(event) {
  try {
    const user = await User.findOne({
      where: { id: event.source },
      attributes: ["id", "firstName", "lastName", "email"],
    });
    let party =  await Party.findOne({
      where: { id: event.party },
      attributes: ["id", "name", "createdAt"],
    });
    if( !party ){
      party = {};
    }
    // Se l'evento riguardo un commento, mi prendo l'oggetto relativo al commento e lo invio
    let comment =  await Comment.findOne({
      where: { id: event.comment },
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      }]
    });
    if (!comment) {
      comment = {};
    }
    const not = {
      source: user,
      party: party,
      comment: comment,
      event: event.event,
      state: true,
    };
    return not;
  } catch (error) {
    console.error(error);
  }
}

//module.exports.socketArray = sockets;
module.exports = router;
module.exports.notificate = notificate;
module.exports.broadcast = broadcast;
