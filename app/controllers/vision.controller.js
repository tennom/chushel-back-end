module.exports = (db) => {
    const Op = db.Sequelize.Op;
    var dataModel = {};
    dataModel.name = "vision";
    dataModel.model = db.vision;
    dataModel.getFields = (reqBody) => {
        return {
            userId: reqBody.userId ? reqBody.userId : null,
            physician: reqBody.physician ? reqBody.physician : null,
            ODsphere: reqBody.ODsphere ? reqBody.ODsphere : null,
            OSsphere: reqBody.OSsphere ? reqBody.OSsphere : null,
            ODcylinder: reqBody.ODcylinder ? reqBody.ODcylinder : null,
            OScylinder: reqBody.OScylinder ? reqBody.OScylinder : null,
            ODaxis: reqBody.ODaxis ? reqBody.ODaxis : null,
            OSaxis: reqBody.OSaxis ? reqBody.OSaxis : null,
            add: reqBody.add ? reqBody.add : null,
            pd: reqBody.pd ? reqBody.pd : null,
            ODCorrected: reqBody.ODcorrected ? reqBody.ODcorrected : null,
            OSCorrected: reqBody.OScorrected ? reqBody.OScorrected : null,
        };

    };

    dataModel.invalidReq = (reqBody) => {
        return !reqBody.userId;
    };
    dataModel.getUnmetFields = (reqBody) => {
        let unmetFields = [];
        if (!reqBody.userId) {
            unmetFields.push(0);
        };
        if (!reqBody.physician) {
            unmetFields.push(1);
        };
        if (!reqBody.add) {
            if (!reqBody.ODsphere) {
                unmetFields.push(2);
            };
            if (!reqBody.OSsphere) {
                unmetFields.push(3);
            };
            if (!reqBody.pd) {
                unmetFields.push(4);
            };
        };

        return unmetFields;
    }

    dataModel.getCondition = (reqQuery) => {
        let { userId } = reqQuery;
        return {
            condition: userId ? { userId: { [Op.eq]: userId } } : null
        }
    };
    return require("../controllers/base.controller.js")(dataModel);

}