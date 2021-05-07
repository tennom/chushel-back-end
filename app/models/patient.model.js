module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        name: {
            type: Sequelize.STRING,
            nullable: false
        },
        contact: {
            type: Sequelize.STRING,
            nullable: false
        },
        birthDate: {
            type: Sequelize.DATEONLY,
            nullable: false
        },
        gender: {
            type: Sequelize.STRING,
            nullable: false
        },
        resideCounty: {
            type: Sequelize.STRING,
            nullable: false
        },
        school: {
            type: Sequelize.STRING,
        },
    });

    return Patient;
};