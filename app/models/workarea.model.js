module.exports = (sequelize, Sequelize) => {
    const WorkArea = sequelize.define("WorkArea", {
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
    return WorkArea;
};
