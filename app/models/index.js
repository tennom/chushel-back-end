const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: "3306",

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};

db.Sequelize = Sequelize;
// define tables
db.patient = require("./patient.model.js")(sequelize, Sequelize);
db.vision = require("./vision.model.js")(sequelize, Sequelize);
// patient to vision relationship
db.patient.hasMany(db.vision, { foreignKey: 'userId', sourceKey: 'id' });
// db.vision.belongsTo(db.patient, { foreignKey: 'userId', targetKey: 'id' });

db.sequelize = sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.sync({ alter: true }).then(() => {
            console.log("database will be modified to fit the new schema if provided.");
        });
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

module.exports = db;