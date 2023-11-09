import Playlist, { validate, validateSongAdditionInPlaylist } from "../../models/playlist.js"
import User from "../../models/users.js"

const getPlaylists = async (req, res) => {
    const playlist = await Playlist.find({ user: req.user._id }).populate('songs')
    return res.status(200).send({ message: 'success', data: playlist })
}
const getPlaylistById = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id).populate('songs')
    return res.status(200).send({ message: 'success', data: playlist })
}
const addPlaylist = async (req, res) => {
    const { error } = validate({ ...req.body, user: req.user._id })
    if (error) {
        return res.status(400).send({ message: error.message })
    }
    const existingPlaylist = await Playlist.find({ name: req.body.name })
    if (existingPlaylist.length > 0) return res.status(400).send({ message: 'Playlist with same name is already created!' })
    const playlist = new Playlist({ ...req.body, user: req.user._id })
    const data = await playlist.save()
    const user = await User.findById(req.user._id)
    user.playlists.push(data._id)
    await user.save()
    return res.status(200).send({ message: 'success', data })
}

const addSongInPlaylist = async (req, res) => {
    const { error } = validateSongAdditionInPlaylist(req.body)
    if (error) { return res.status(400).send({ message: error.message }) }
    const playlist = await Playlist.findById(req.body.playlistId)
    if (!playlist) return res.status(400).send({ message: 'no playlist found!' })
    if (playlist.songs.indexOf(req.body.songId) > -1) return res.send({ message: 'Song already present in the playlist!!' })
    playlist.songs.push(req.body.songId)
    const data = await playlist.save()
    return res.status(200).send({ message: 'success', data })
}

const removeSongFromPlaylist = async (req, res) => {
    const { error } = validateSongAdditionInPlaylist(req.body)
    if (error) { return res.status(400).send({ message: error.message }) }
    const playlist = await Playlist.findById(req.body.playlistId)
    if (!playlist) return res.status(400).send({ message: 'no playlist found!' })
    if (playlist.songs.indexOf(req.body.songId) < 0) return res.send({ message: 'Nothing to remove!!' })
    playlist.songs.splice(req.body.songId)
    const data = await playlist.save()
    return res.status(200).send({ message: 'success', data })
}

const updatePlaylistById = async (req, res) => {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    return res.status(200).send({ message: 'success', data: playlist })
}

const deletePlaylistById = async (req, res) => {
    const playlist = await Playlist.findByIdAndDelete(req.params.id)
    return res.status(200).send({ message: 'success', data: playlist })
}

export {
    getPlaylists,
    getPlaylistById,
    addPlaylist,
    addSongInPlaylist,
    removeSongFromPlaylist,
    updatePlaylistById,
    deletePlaylistById
}