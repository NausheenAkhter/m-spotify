import mongoose from "mongoose";
import Joi from "joi";
const ObjectId = mongoose.Schema.Types.ObjectId

const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    desc: {
        type: String
    },
    songs: {
        type: Array,
        default: []
    },
    img: {
        type: String,
    },
})

const validate = (playlist) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(),
        desc: Joi.string().allow(''),
        songs: Joi.array().items(Joi.string()),
        img: Joi.string().allow(''),
    })
    return schema.validate(playlist)
}

const Playlist = mongoose.model('song', playListSchema)
export default Playlist
export { validate }