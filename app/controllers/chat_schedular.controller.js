const db = require("../models");
const Chat_schedule = db.chat_schedule;
const Op = db.Sequelize.Op;
// search appointment on based of date
exports.schedule_search = (req, res) => {

    if (req.body.schedule_date == "" || req.body.schedule_date == null) {
        res.send("no record");
    } else {
        Chat_schedule.findAll({
            where: {
                schedule_date: {
                    [Op.like]: '%' + req.body.schedule_date + '%'
                },
                father_id: {
                    [Op.like]: req.body.father_id
                }
            },
        })
            .then(chat_schedule => {
                if (chat_schedule.length == 0) {
                    res.send({ message: false });
                }
                else {
                    res.json(chat_schedule)
                }


            })

    }
};
// schedule appointmet
exports.chat_scheduler = (req, res) => {
    const date1 = new Date().toISOString().
        replace(/T/, '').
        replace(/\..+/, '').
        replace([6], [0]);
    Chat_schedule.create({
        schedule_date: req.body.schedule_date,
        schedule_time: req.body.schedule_time,
        schedule_name: req.body.schedule_name,
        schedule_email: req.body.schedule_email,
        father_id: req.body.father_id,
        comments: req.body.comments
    })
        .then(chat_schedule => {
            console.log(chat_schedule);
            res.send({ message: "schudele appointment!" });
        })
}
exports.SeachBycalender = (req, res) => {
    Chat_schedule.findAll({

    }).then(data => {

        res.json(data);
        console.log(data)
    })
}
exports.get_schedule = (req, res) => {
    let dates = [];
    if (req.body.schedule_date == "" || req.body.schedule_date == null) {
        res.send({ message: false });
    } else {
        Chat_schedule.findAll({
            where: {
                father_id: {
                    [Op.like]: req.body.father_id
                }
            },
        })
            .then(chat_schedule => {
                chat_schedule.forEach((element) => {
                    var mydate = new Date(element.schedule_date);
                    console.log(mydate.toDateString());
                    dates.push(element.schedule_date);
                });

                if (chat_schedule.length == 0) {
                    res.send({ message: false });
                } else {
                    res.json({ "chats": chat_schedule, "dates": dates });
                }


            })

    }
};