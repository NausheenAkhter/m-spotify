const { search } = require("../../controller/search/index.js");
const auth = require("../../middleware/auth/index.js");


const searchRoutes = (app) => {
    app.get('/api', auth, search)
}

module.exports =  { searchRoutes }