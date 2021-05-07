module.exports = (sequelize, Sequelize) => {
    const Vision = sequelize.define("vision", {
        userId: {
            type: Sequelize.INTEGER,
            nullable: false
        },
        physician: {
            type: Sequelize.INTEGER,
            nullable: false,
        },
        ODsphere: {
            type: Sequelize.DECIMAL(10, 2)
            // todo: add nullable and validators.
        },
        OSsphere: {
            type: Sequelize.DECIMAL(10, 2)
        },
        ODcylinder: {
            type: Sequelize.DECIMAL(10, 2)
        },
        OScylinder: {
            type: Sequelize.DECIMAL(10, 2)
        },
        ODaxis: {
            type: Sequelize.INTEGER(3)
        },
        OSaxis: {
            type: Sequelize.INTEGER(3)
        },
        add: {
            type: Sequelize.DECIMAL(10, 2)
        },
        pd: {
            type: Sequelize.INTEGER(3),
        },
        ODcorrected: {
            type: Sequelize.DECIMAL(10, 2)
        },
        OScorrected: {
            type: Sequelize.DECIMAL(10, 2)
        },
        // ODprism: {
        //     type: Sequelize.DECIMAL(10, 2)
        // },
        // OSprism: {
        //     type: Sequelize.DECIMAL(10, 2)
        // },
    });

    return Vision;
};