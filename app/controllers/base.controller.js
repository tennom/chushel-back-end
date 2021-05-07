
module.exports = (dataModel) => {


    const getPagination = (page, size) => {
        // set paging query limit to within 12 records. 
        const limit = 13 > size && size > 0 ? size : 3;
        // note page starts from 1
        const offset = page > 0 ? (page - 1) * limit : 0;

        return { limit, offset };
    };

    const getPagingData = (countAndData, page, limit, offset) => {
        const { count: total, rows: data } = countAndData;
        const per_page = limit;
        // validation against available data count
        const validOffset = total - offset > 0;

        const current_page = !validOffset ? null : page == 0 ? 1 : page;
        const last_page = validOffset ? Math.ceil(total / limit) : null;
        const next_page_url = current_page < last_page ? `page=${current_page + 1}&size=${limit}` : null;
        const prev_page_url = current_page > 1 ? `page=${current_page - 1}&size=${limit}` : null;
        const from = validOffset ? offset + 1 : null;
        // tatal-offset>limit
        const to = total - offset > limit ? offset + limit : validOffset ? total : null;


        return { total, per_page, current_page, last_page, next_page_url, prev_page_url, from, to, data };
    };

    return {
        // Create and Save a new record
        create: (req, res) => {
            // TODO: Validate requests
            // if (dataModel.invalidReq(req.body)) {
            //     return res.status(400).json({
            //         message: "Content can not be empty!"
            //     });
            //     // return;
            // }
            let unmetFields = dataModel.getUnmetFields(req.body);
            if (unmetFields.length != 0) {
                return res.status(400).json({
                    unmetIds: unmetFields
                });
            }

            // Save record in the database
            dataModel.model.create(dataModel.getFields(req.body))
                .then(data => {
                    // ISSUE: mysql auto increments ids even on failed insertions due to foreign key
                    // data.message = "Data insertion completed.";
                    res.send({ message: "ཆ་འཕྲིན་ཁ་སྣོན་བྱས་ཟིན།" });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || `Some error occurred while creating the ${dataModel.name}.`
                    });
                });

        },
        // Retrieve all records from the database.
        findAll: (req, res) => {
            console.log(req.query)
            console.log(req.body)
            let { page, size } = req.query;
            let { condition } = dataModel.getCondition(req.query);
            page = page ? +page : 0;
            size = size ? +size : 0;

            const { limit, offset } = getPagination(page, size);

            dataModel.model.findAndCountAll({
                limit: limit,
                offset: offset,
                where: condition,
                order: [['createdAt', 'DESC']],
            })
                .then(data => {
                    const response = getPagingData(data, page, limit, offset);
                    res.send(response);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || `Some error occurred while retrieving ${dataModel.name}s.`
                    });
                });
        },

        // Find a single record with an id
        findOne: (req, res) => {
            const id = req.params.id;

            dataModel.model.findByPk(id)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: `Error retrieving the ${dataModel.name} with id=` + id
                    });
                });
        },

        // Update a record by the id in the request
        update: (req, res) => {
            const id = req.params.id;
            let unmetFields = dataModel.getUnmetFields(req.body);
            if (unmetFields.length != 0) {
                return res.status(400).json({
                    unmetIds: unmetFields
                });
            }
            dataModel.model.update(req.body, {
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: `${dataModel.name}་བསྒྱུར་བཅོས་བྱས་ཚར།`
                        });
                    } else {
                        res.send({
                            message: `Cannot update ${dataModel.name} with id=${id}. Maybe ${dataModel.name} was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: `Error updating ${dataModel.name} with id=` + id
                    });
                });
        },

        // Delete a record with the specified id in the request
        delete: (req, res) => {
            const id = req.params.id;

            dataModel.model.destroy({
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: `${dataModel.name}་བསུབས་ཚར་སོང་།`
                        });
                    } else {
                        res.send({
                            message: `Cannot delete ${dataModel.name} with id=${id}. Maybe ${dataModel.name} was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: `Could not delete ${dataModel.name} with id=` + id
                    });
                });
        },

        // Delete all records from the database.
        deleteAll: (req, res) => {
            dataModel.model.destroy({
                where: {},
                truncate: false
            })
                .then(nums => {
                    res.send({ message: `${nums} ${dataModel.name}s were deleted successfully!` });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || `Some error occurred while removing all ${dataModel.name}s.`
                    });
                });
        },
    }

}








