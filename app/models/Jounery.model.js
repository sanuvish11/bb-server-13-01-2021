module.exports = (sequelize, Sequelize) => {
    const Jounery = sequelize.define("Jounery", {
        verse: {
            type: Sequelize.STRING
        },
        meaning: {
            type: Sequelize.STRING
        },
        father_id:{
            type: Sequelize.STRING
        }

    });
    return Jounery;
};
