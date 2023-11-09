const mongoose = require("mongoose");
const { Song } = require("../../models/song.js");
const { User } = require("../../models/users.js");
const { validate } = require("../../models/song.js"); // Destructured

const getSongs = async (req, res, next) => {
    const songs = await Song.find()
    return res.status(200).send({ message: 'Sent!', data: songs })
}

const getSongsById = async (req, res) => {
    const song = await Song.findById(req.params.id)
    return res.status(200).send({ message: 'Sent!', data: song })
}
const addSongs = async (req, res) => {
    if (!validate(req.body)) throw new Error('Validation error!')
    const song = new Song(req.body)
    const data = await song.save()
    return res.status(200).send({ message: 'Added!', data })
}
const updateSongById = async (req, res) => {
    if (!validate(req.body)) throw new Error('Validation error!')
    const data = await Song.findByIdAndUpdate(req.params.id, { $set: req.body })
    return res.status(200).send({ message: 'Updated!', data })
}
const deleteSongById = async (req, res) => {
    try {
        const data = await Song.findByIdAndDelete(req.params.id)
        return res.status(200).send({ message: 'Deleted!', data })
    } catch (error) {
        return res.status(400).send({ message: 'Failed to delete!' })
    }

}
const likesSong = async (req, res) => {
    const data = await Song.findById(req.params.id)
    if (!data) return res.status(400).send({ message: 'No song found!' })
    const userData = await User.findById(req.user._id)
    if (userData.likedSongs.indexOf(req.params.id) > -1) {
        userData.likedSongs.splice(userData.likedSongs.indexOf(req.params.id), 1)
    } else {
        userData.likedSongs.push(req.params.id)
    }
    const updatedUser = await userData.save()

    return res.status(200).send({ message: 'Added to liked songs!', data: updatedUser })
}

const getLikedSongs = async (req, res) => {
    const user = await User.findById(req.user._id).populate('likedSongs')
    return res.status(200).send({ message: 'Success', data: user.likedSongs })
}
module.exports = { getSongs, getSongsById, addSongs, updateSongById, deleteSongById, likesSong, getLikedSongs }