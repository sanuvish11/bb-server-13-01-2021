const db = require("../models");
const config = require("../config/auth.config");
const PersonalFav = db.personalfav;
const Op = db.Sequelize.Op;


exports.personalfav = (req, res) => {
    PersonalFav.create({
        verse: req.body.verse,
        meaning: req.body.meaning,
        father_id: req.body.father_id,
    })
        .then(personal => {
            console.log(personal);
            res.send({
                result: 1,
                message: "record save success!",
                personal
            });

        });
};
exports.getpersonalfav = (req, res) => {
    PersonalFav.findAll({
        where: {
            father_id: {
                [Op.like]: req.body.father_id
            }
        },
    })
        .then(personal => {

            res.json(personal)
        });
}
exports.deletepesonalfav = (req, res) => {
    const id = req.param("id");
    PersonalFav.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Record deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete perosnal fav with id=${id}. Maybe  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete perosnal fav with id=" + id
            });
        });
};