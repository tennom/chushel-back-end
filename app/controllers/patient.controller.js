module.exports = (db) => {
    const Op = db.Sequelize.Op;
    var dataModel = {};
    dataModel.name = "patient";
    dataModel.model = db.patient;

    dataModel.getFields = (reqBody) => {
        return {
            name: reqBody.name,
            contact: reqBody.contact,
            birthDate: reqBody.birthDate ? reqBody.birthDate : null,
            gender: reqBody.gender,
            resideCounty: reqBody.resideCounty,
            school: reqBody.school ? reqBody.school : null,
        };

    };

    dataModel.getUnmetFields = (reqBody) => {
        let unmetFields = [];
        if (!reqBody.name) {
            unmetFields.push(0);
        };
        if (!reqBody.contact) {
            unmetFields.push(1);
        };
        if (!reqBody.gender) {
            unmetFields.push(2);
        };
        return unmetFields;
    }

    dataModel.getCondition = (reqQuery) => {
        let { name } = reqQuery;
        return {
            // condition: name ? { name: { [Op.like]: `%${name}%` } } : null
            condition: name ? (isNaN(name) ? { name: { [Op.like]: `%${name}%` } } : { contact: { [Op.like]: `%${name}%` } }) : null

        }
    };


    return require("../controllers/base.controller.js")(dataModel);

}