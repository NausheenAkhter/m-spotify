const {
    loginUser,
    signUp,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require("../../controller/user/index.js");

const validateObjectId = require("../../middleware/validObjectId.js");
const admin = require("../../middleware/admin/index.js");
const auth = require("../../middleware/auth/index.js");

const userRoutes = (app) => {
    app.post('/api/login', loginUser)
    app.post('/api/signUp', signUp)
    app.get('/api/fetchUsers', admin, getAllUsers)
    app.get('/api/fetchUsers/:id', [validateObjectId, auth], getUserById)
    app.put('/api/fetchUsers/:id', [validateObjectId, auth], updateUserById)
    app.delete('/api/fetchUsers/:id', [validateObjectId, auth], deleteUserById)
}

module.exports = userRoutes;

