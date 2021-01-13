const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var EmailService = require('../utility/EmailService');
var MailMessage = require('../utility/MailMessage');
var EmailBuilder = require('../utility/EmailBuilder');
var async = require('async');
const fs = require('fs');
const User = db.user;
const Role = db.role;

const Country = db.country;
const State = db.state;
const City = db.city;
const File = db.file;
const Op = db.Sequelize.Op;

// Save User to Database
exports.signup = (req, res) => {
    const date = new Date().toISOString().
        replace(/T/, '').
        replace(/\..+/, '');

    const uid = ((req.body.username).slice(0, 3)) + date
    console.log(date);
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        phone_no: req.body.phone_no,
        last_name: req.body.last_name,
        gender: req.body.gender,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        yob: req.body.yob,
        time_zone: req.body.time_zone,
        church_name: req.body.church_name,
        paster_name: req.body.paster_name,
        church_city: req.body.church_city,
        church_state: req.body.church_state,
        id_is_Active: 1,
        restricted: 0,
        created_by: req.body.created_by,
        modify_by: req.body.modify_by,
        u_id: uid
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([2]).then(() => {
                    res.send({ message: "User registered successfully!" });
                    var m = {
                        email: user.email,
                        password: user.password,
                        first_name: user.first_name,
                        last_name: user.last_name
                    };

                    var msg = EmailBuilder.getSignUpMessage(m);
                    msg.to = req.body.email;

                    var ser = new EmailService()
                    ser.sendEmail(msg, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// user login api
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user.restricted == 0) {

                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
            } else {
                res.send("user not authorized to access")
            }
            //jwt token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var role_id = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {

                    role_id.push(roles[i].id);
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    roles: role_id,
                    accessToken: token,

                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//search user by username
exports.search = (req, res) => {
    if (req.body.username == "" || req.body.username == null) {
        res.send("no record");
    } else {
        User.findAll({
            where: {
                username: {
                    [Op.like]: '%' + req.body.username + '%'
                }
            }
        })
            .then(user => {
                console.log(user);
                if (user.length == 0) {
                    return res.send({ message: "User Not found." });
                }
                res.json({
                    data: user.map(function (v) {
                        return {
                            user: v.username
                        }
                    })
                })
            });
    }
};
// update record using username
exports.update = (req, res) => {
    const username = req.body.username;
    User.update(req.body, {
        where: { username: username }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${username}. Maybe User was not found or req.body is empty!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating username with id=" + username
            });
        });

}

exports.updatepaster = (req, res) => {
    const ROOM_ID = req.body.ROOM_ID;
    User.update(req.body, {
        where: { PASTER_ID: ROOM_ID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pastor was updated successfully."
                });
            } else {
                // res.send({
                //     message: `Cannot update User with id=${ROOM_ID}. Maybe User was not found or req.body is empty!`
                // });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating username with id=" + ROOM_ID
            });
        });

}


exports.getCounty = (req, res) => {
    Country.findAll()
        .then(country => {

            res.json(country)
        });
}

exports.getState = (req, res) => {
    State.findAll({
        where: {
            country_id: {
                [Op.like]: req.body.country_id
            }
        }
    })
        .then(state => {

            res.json(state)
        });
}

exports.getCity = (req, res) => {
    City.findAll({
        where: {
            state_id: {
                [Op.like]: req.body.state_id
            }
        }
    }).then(city => {

        res.json(city)
    });
}



exports.uploadFile = (req, res) => {
    File.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer

    }).then(() => {
        res.json({ msg: 'File uploaded successfully! -> filename = ' + req.file.originalname });

    })

}
exports.listAllFiles = (req, res) => {
    File.findAll({ attributes: ['id', 'name'] }).then(files => {
        res.json(files);
    });
}

// mycodestarts







