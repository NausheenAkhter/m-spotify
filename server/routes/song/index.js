const validateObjectId = require("../../middleware/validObjectId.js");
const admin = require("../../middleware/admin/index.js");
const auth = require("../../middleware/auth/index.js");
const {
  getSongs,
  getSongsById,
  addSongs,
  updateSongById,
  deleteSongById,
  likesSong,
  getLikedSongs
} = require("../../controller/song/index.js");


const songRoutes = (app) => {
    app.get('/api/songs', auth, getSongs)
    app.get('/api/songs/:id', [validateObjectId, auth], getSongsById)
    app.get('/api/likedSongs', auth, getLikedSongs)
    app.post('/api/addSongs', admin, addSongs)
    app.post('/api/likesSong/:id', [validateObjectId, auth], likesSong)
    app.put('/api/songs/:id', [validateObjectId, auth], updateSongById)
    app.delete('/api/songs/:id', [validateObjectId, auth], deleteSongById)    

}

module.exports =  songRoutes
