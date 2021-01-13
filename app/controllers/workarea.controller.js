const db = require("../models");
const config = require("../config/auth.config");
const WorkArea = db.workarea;
const Op = db.Sequelize.Op;


exports.workarea = (req, res) => {
    WorkArea.create({
        verse: req.body.verse,
        meaning: req.body.meaning,
        father_id: req.body.father_id,
    })
        .then(workarea => {
            console.log(workarea);
            res.send({
                result: 1,
                message: "record add success successfully!",
                workarea
            });

        });
};
exports.getworkarea = (req, res) => {
    WorkArea.findAll({
        where: {
            father_id: {
                [Op.like]: req.body.father_id
            }
        },
    })
        .then(workarea => {

            res.json(workarea)
        });
}
exports.deleteworkarea = (req, res) => {
    const id = req.params("id");
    WorkArea.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Work area note  was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Work area note with id=${id}. Maybe  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Work area note with id=" + id
            });
        });
};