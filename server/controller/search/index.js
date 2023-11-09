const { Playlist } = require("../../models/playlist.js");
const { Song } = require("../../models/song.js");


const search = async (req, res) => {
    const searchQuery = req.query.search
    const songs = await Song.find({ name: { $regex: new RegExp(searchQuery, 'i') } });
    const playlists = await Playlist.find({ name: { $regex: new RegExp(searchQuery, 'i') } }).populate('songs')
    const result = {
        songs,
        playlists
    }
    return res.status(200).send({ message: 'Success', data: result })
}

module.exports = {
    search
}