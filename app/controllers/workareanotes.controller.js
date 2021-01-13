
const db = require("../models");
const config = require("../config/auth.config");
const WorkAreaNotes = db.workareanotes;
const Op = db.Sequelize.Op;
exports.getworkareanotes = (req, res) => {
    WorkAreaNotes.findAll()
        .then(workareanotes => {

            res.json(workareanotes)
        });
}

exports.deleteworkareanotes = (req, res) => {
    const id = req.param("id");
    WorkAreaNotes.destroy({
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
exports.updateworkareanote = (req, res) => {
    const id = req.params.id;

    WorkAreaNotes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Work area note was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Work area note with id=${id}. Maybe Work area note was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Work area note with id=" + id
            });
        });
};

exports.workareanote = (req, res) => {
    WorkAreaNotes.create({
        Notes: req.body.Notes,
        UserName: req.body.UserName,
        Date_Time: req.body.Date_Time,
        father_id: req.body.father_id
    })
        .then(workareanotes => {
            console.log(workareanotes);
            res.send({
                result: 1,
                message: "add successfully!",
                workareanotes
            });

        });
};
