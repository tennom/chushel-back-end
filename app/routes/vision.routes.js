module.exports = (app, db) => {
    const visions = require("../controllers/vision.controller.js")(db);

    var router = require("express").Router();

    // Create a new vision
    router.post("/", visions.create);

    // Retrieve all visions
    router.get("/", visions.findAll);

    // // Retrieve all published visions
    // router.get("/published", visions.findAllPublished);

    // Retrieve a single vision with id
    router.get("/:id", visions.findOne);

    // Update a vision with id
    router.put("/:id", visions.update);

    // Delete a vision with id
    router.delete("/:id", visions.delete);

    // Delete all visions
    router.delete("/", visions.deleteAll);

    app.use('/api/visions', router);
};