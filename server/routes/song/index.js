import { loginUser, signUp, getAllUsers, getUserById, updateUserById, deleteUserById } from "../../controller/user/index.js";
import validateObjectId from "../../middleware/validObjectId.js";
import admin from "../../middleware/admin/index.js";
import auth from "../../middleware/auth/index.js";

const songRoutes = (app) => {
    // app.post('/api/login', loginUser)
    // app.post('/api/signUp', signUp)
    // app.get('/api/fetchUsers', admin, getAllUsers)
    // app.get('/api/fetchUsers/:id', [validateObjectId, auth], getUserById)
    // app.put('/api/fetchUsers/:id', [validateObjectId, auth], updateUserById)
    // app.delete('/api/fetchUsers/:id', [validateObjectId, auth], deleteUserById)    
}

export default songRoutes
