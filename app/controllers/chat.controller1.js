
const db = require("../models");
const Chat = db.chat;
const RoomParticipant = db.roomparticipant;
const Op = db.Sequelize.Op;

exports.initiateChat = (req, res) => {

   const last_mesg= console.log(req.body.LAST_MESSAGE)
    RoomParticipant.findOne({
        where: {
            ROOM_ID: [Op.like] = req.body.ROOM_ID
        }
    }).then(data => {
        // console.log(data.ROOM_ID)
        if (data != null) {   
            if (data.CHAT_STATUS == 0) {
                //  new record insertion
                RoomParticipant.update({LAST_MESSAGE: req.body.LAST_MESSAGE }, {
                    where: { ROOM_ID: req.body.ROOM_ID }
                })
                Chat.create({
                 
                      sender_id: req.body.ROOM_ID,
                      message: req.body.LAST_MESSAGE,
                      date_time: req.body.date_time,                    
                      ROOM_ID_FK: req.body.ROOM_ID,
                      SENDER_TYPE: req.body.SENDER_TYPE
                  })
            }        
            if (data.CHAT_STATUS == 1) {
                console.log(data)
                RoomParticipant.update({   LAST_MESSAGE: req.body.LAST_MESSAGE, }, {
                    where: { ROOM_ID: req.body.ROOM_ID }
                })
                Chat.create({                
                    sender_id: req.body.ROOM_ID,
                    message: req.body.LAST_MESSAGE,
                    date_time: req.body.date_time,
                    ROOM_ID_FK: req.body.ROOM_ID,
                    SENDER_TYPE: req.body.SENDER_TYPE
                })
            }
            if (data.CHAT_STATUS == 2) {
                //  new record insertion
                RoomParticipant.update({ CHAT_STATUS: 0, LAST_MESSAGE: req.body.LAST_MESSAGE, TOPIC : req.body.TOPIC, }, {
                    where: { ROOM_ID: req.body.ROOM_ID }
                })
                Chat.create({
                    //  chat_id: req.body.chat_id,
                      sender_id: req.body.ROOM_ID,
                      message: req.body.LAST_MESSAGE,
                      date_time: req.body.date_time,
                      //status: req.body.status,
                      ROOM_ID: req.body.ROOM_ID,
                      SENDER_TYPE: req.body.SENDER_TYPE
                  })
            }

        }
        else {
            RoomParticipant.create({
                USER_ID: req.body.ROOM_ID,
                USER_NAME: req.body.USER_NAME,
                TOPIC:req.body.TOPIC,
                ROOM_ID: req.body.ROOM_ID,
                CHAT_STATUS: 0,
                LAST_MESSAGE: req.body.LAST_MESSAGE
            })
            Chat.create({                
                sender_id: req.body.ROOM_ID,
                message: req.body.LAST_MESSAGE,
                date_time: req.body.date_time,
                ROOM_ID_FK: req.body.ROOM_ID,
                SENDER_TYPE: req.body.SENDER_TYPE
            })

        }
    }).then(data=>{
        res.send("success");
    })
}


exports.chat_history = (req, res) => {
    Chat.create({
        chat_id: req.body.chat_id,
        sender_id: req.body.sender_id,
        message: req.body.message,
        // topic : req.body.topic,
        date_time: req.body.date_time,
        status: req.body.status,
        ROOM_ID: req.body.ROOM_ID_FK,
        SENDER_TYPE: req.body.SENDER_TYPE
    })
        .then(chat => {
            res.send({
                result: 1,
                message: "User registered successfully!"
            });

        });

};


// get details
exports.getchatdetails = (req, res) => {
    Chat.findAll({
        where: {
            ROOM_ID_FK: {
                [Op.like]: req.body.ROOM_ID_FK
            }
        }
    })
        .then(chat => {

            res.json(chat)
        });
}


exports.jointable = (req, res) => {
    Chat.findOne({
        where: {
            ROOM_ID_FK: {
                [Op.like]: req.body.ROOM_ID_FK
            }
        }
    })
}





exports.getchatdetail = (req, res) => {
    Chat.findAll({
        where: {
            ROOM_ID_FK: {
                [Op.like]: req.body.ROOM_ID_FK
            }
        }
    })
        .then(chat => {

            res.json(chat)
        });
}
exports.searchbysender = (req, res) => {
    Chat.findAll({
        where: {
            sender_id: {
                [Op.like]: req.body.sender_id
            }
        }
    }).then(data => {
        res.json(data)
    })
}
