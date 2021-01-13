const db = require("../models");
const config = require("../config/auth.config");
const Journey = db.journey;
const Op = db.Sequelize.Op;


exports.Journey = (req, res) => {
    Journey.create({
        verse: req.body.verse,
        meaning: req.body.meaning,
        father_id: req.body.father_id,
    })
        .then(journey => {
            console.log(journey);
            res.send({
                result: 1,
                message: "record add succcessful!",
                journey
            });

        });
};
exports.Journeylist = (req, res) => {
    Journey.findAll({
        where: {
            father_id: {
                [Op.like]: req.body.father_id
            }
        },
    })
        .then(journey => {

            res.json(journey)
        });
}
exports.JourneyDelete = (req, res) => {
    const id = req.param("id");
    Journey.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Journey deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Journey with id=${id}. Maybe  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Journey with id=" + id
            });
        });
};