import mongoose from "mongoose";
import Joi from "joi";
import User from "./users.js";
import Playlist from "./playlist.js";


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

songSchema.pre("findOneAndDelete", async function (next) {
    const { _id = '' } = this.getQuery()
    try {
        const users = await User.find()
        for (const user of users) {
            const index = user.likedSongs.indexOf(_id);
            if (index !== -1) {
                user.likedSongs.splice(index, 1);
                await user.save();
            }
        }
        const playlists = await Playlist.find();
        for (const playlist of playlists) {
            const index = playlist.songs.indexOf(_id);
            if (index !== -1) {
                playlist.songs.splice(index, 1);
                await playlist.save();
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

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