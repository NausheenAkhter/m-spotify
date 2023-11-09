import validateObjectId from "../../middleware/validObjectId.js";
import admin from "../../middleware/admin/index.js";
import auth from "../../middleware/auth/index.js";
import { getSongs, getSongsById, addSongs, updateSongById, deleteSongById, likesSong, getLikedSongs } from "../../controller/song/index.js";
import { getPlaylistById, getPlaylists, addPlaylist, addSongInPlaylist, 
    removeSongFromPlaylist, updatePlaylistById, deletePlaylistById, getAllPlaylists, getRandomPlaylists } from "../../controller/playlist/index.js";

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

export default playListRoutes
