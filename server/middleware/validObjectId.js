const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        throw new Error('Invalid ID')
    next()

}

module.exports =  validateObjectId