import mongoose from "mongoose";
import Joi from "joi";
import User from "./users.js";


const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
})

songSchema.pre('deleteOne', { document: true },async (req, res, next) => {
    const user = await new User.findById(req.user._id)
    user.likedSongs.splice(req.params.id, 1)
    await user.save()
    next()
})

const validate = (song) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        song: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.string().required(),

    })
    return schema.validate(song)
}

const Song = mongoose.model('song', songSchema)
export default Song
export { validate }