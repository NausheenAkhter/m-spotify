import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        throw new Error('Invalid ID')
    next()

}

export default validateObjectId