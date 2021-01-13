module.exports = (sequelize, Sequelize) => {
    const Personalfav = sequelize.define("personalfav", {
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
    return Personalfav;
};
