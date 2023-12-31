const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId

const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    desc: {
        type: String
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song', default: [] }],
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

const validateSongAdditionInPlaylist = (playlist) => {
    const schema = Joi.object({
        songId: Joi.string().required(),
        playlistId: Joi.string().required(),
    })
    return schema.validate(playlist)
}

const Playlist = mongoose.model('playlist', playListSchema)
module.exports =  { validate, validateSongAdditionInPlaylist, Playlist }