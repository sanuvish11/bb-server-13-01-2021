const db = require("../models");
const config = require("../config/auth.config");
const RoomParticipant = db.roomparticipant;
const Op = db.Sequelize.Op;

exports.closeChat = (req, res) => {
    const RoomID = req.body.ROOM_ID;
    const chatStatus = req.body.CHAT_STATUS;
    const chatComment = req.body.CHAT_COMMENT;
    const isFlagged = req.body.IS_FLAG;
    const flagComment = req.body.FLAG_COMMENT;

    RoomParticipant.update({
        CHAT_STATUS: chatStatus, CHAT_COMMENT: chatComment, IS_FLAG: isFlagged, FLAG_COMMENT: flagComment
    }, {
        where: {
            ROOM_ID: RoomID
        }
    }).then(data => {
        res.send("1");
    })

}
exports.updateChatStatus = (req, res) => {
    const chatID = req.param("id1");
    const prevStatus = req.param("id2");
    console.log(chatID, prevStatus)
    if (prevStatus == 0) {
        RoomParticipant.update({ CHAT_STATUS: 1 }, {
            where: { id: chatID }
        }).then(num => {

            res.send("Chat is now live")
        }).catch(err => {
            res.status(500).send({
                message: "Error updating username with id=" + username
            });
        });
    };
    if (prevStatus == 2) {
        const RoomID = req.param("id1");

        RoomParticipant.update({ CHAT_STATUS: 0 }, {
            where: { ROOM_ID: RoomID }
        }).then(num => {
            res.send("1")
        }).catch(err => {
            res.status(500).send({
                status: 0
            });
        });
    }

}

exports.GetAllActiveChats = (req, res) => {
    RoomParticipant.findAll({
        where: {
            CHAT_STATUS: 1
        }
    }).then(data => {
        res.send(data)
    })
}

exports.GetAllChats = (req, res) => {
    RoomParticipant.findAll()
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}
exports.getroomdetails = (req, res) => {
    RoomParticipant.findAll({
        where: {
            CHAT_STATUS: 0
        }
    }).then(roomparticipant => {

        res.json(roomparticipant)
    });
}
exports.room_participant = (req, res) => {
    var roomfk;
    var userfk = req.body.USER_ID
    roomfk = req.body.ROOM_ID

    RoomParticipant.create({
        RnP_ID: req.body.RnP_ID,
        USER_ID: userfk,
        USER_NAME: req.body.USER_NAME,
        ROOM_ID: roomfk,
        PASTOR_ID: req.body.PASTOR_ID,
        CHAT_STATUS: req.body.CHAT_STATUS,
        CHAT_COMMENT: req.body.CHAT_COMMENT,
        LAST_MESSAGE: req.bod.LAST_MESSAGE
    }).then()
    Chat.create({
        ROOM_ID_FK: roomfk,
        sender_id: userfk,
        SENDER_TYPE: userfk
    }).then()
    RoomParticipant.findOne({
        where: {
            ROOM_ID: req.body.ROOM_ID
        }
    })

        .then(roomparticipant => {
            console.log(roomparticipant);
            console.log(roomparticipant.ROOM_ID)
            res.send({ message: "User registered successfully!" });

        });
};
