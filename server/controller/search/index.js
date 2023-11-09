import Playlist from "../../models/playlist.js"
import Song from "../../models/song.js"

const search = async (req, res) => {
    const searchQuery = req.query.search
    const songs = await Song.find({ name: { $regex: new RegExp(searchQuery, 'i') } });
    const playlists = await Playlist.find({ name:  { $regex: new RegExp(searchQuery, 'i')  } })
    const result = {
        songs,
        playlists
    }
    return res.status(200).send({ message: 'Success', data: result })
}

export {
    search
}