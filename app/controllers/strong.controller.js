const db = require("../models");
const Strong = db.strong;
const Bible = db.bible;
const Op = db.Sequelize.Op;
exports.GetAllStrong = (req, res) => {
    let results = [];
    let verse = [];
    Strong.findAll({
        where: {
            code: {
                [Op.like]: req.body.code
            },
        }
    })
        .then(data => {

            verse = data;
            verse.forEach((element) => {
                Bible.findAll({
                    where: {
                        verse: {
                            [Op.like]: element.verse
                        }
                    }
                }).then(message => {
                    results.push(message)

                    if (verse.length == results.length) {
                        res.send(Array.prototype.concat.apply([], results))
                    }
                })
            });

            console.log(results.length)

        }).catch(err => res.send(err))
}
exports.GetAllStrongcode = (req, res) => {
    Strong.findAll({
        where: {
            verse: {
                [Op.like]: req.body.verse
            },
        }

    })
        .then(data => {
            if (data.length == 0) {
                res.send({ message: false });
            }
            else {
                res.json(data)
            }
            // res.json(data); 
        }).catch(err => res.send(err))
}
