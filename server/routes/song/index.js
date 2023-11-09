import validateObjectId from "../../middleware/validObjectId.js";
import admin from "../../middleware/admin/index.js";
import auth from "../../middleware/auth/index.js";
import { getSongs, getSongsById, addSongs, updateSongById, deleteSongById, likesSong, getLikedSongs } from "../../controller/song/index.js";

const songRoutes = (app) => {
    app.get('/api/songs', auth, getSongs)
    app.get('/api/songs/:id', [validateObjectId, auth], getSongsById)
    app.get('/api/likedSongs', auth, getLikedSongs)
    app.post('/api/addSongs', admin, addSongs)
    app.post('/api/likesSong/:id', [validateObjectId, auth], likesSong)
    app.put('/api/songs/:id', [validateObjectId, auth], updateSongById)
    app.delete('/api/songs/:id', [validateObjectId, auth], deleteSongById)    

}

export default songRoutes
