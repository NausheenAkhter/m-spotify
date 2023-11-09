const validateObjectId = require("../../middleware/validObjectId.js");
const admin = require("../../middleware/admin/index.js");
const auth = require("../../middleware/auth/index.js");
const {
  getPlaylistById,
  getPlaylists,
  addPlaylist,
  addSongInPlaylist,
  removeSongFromPlaylist,
  updatePlaylistById,
  deletePlaylistById,
  getAllPlaylists,
  getRandomPlaylists,
} = require("../../controller/playlist/index.js");


const playListRoutes = (app) => {
    app.get('/api/playlists',auth, getPlaylists)
    app.get('/api/allPlaylists', getAllPlaylists)
    app.get('/api/randomPlaylists', getRandomPlaylists)
    app.get('/api/playlists/:id', [validateObjectId, auth], getPlaylistById)
    app.post('/api/addPlaylist', auth, addPlaylist)
    app.post('/api/addSongInPlaylist', auth, addSongInPlaylist)
    app.post('/api/removeSongFromPlaylist', auth, removeSongFromPlaylist)
    app.put('/api/playlists/:id', [validateObjectId, auth], updatePlaylistById)
    app.delete('/api/playlists/:id', [validateObjectId, auth], deletePlaylistById)    

}

module.exports = playListRoutes
