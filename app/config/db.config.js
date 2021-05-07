module.exports = {
    HOST: "localhost",
    USER: "FAKEUSER",
    PASSWORD: "FAKEPASSWORD",
    DB: "chushel",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};