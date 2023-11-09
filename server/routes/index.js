const playListRoutes = require("./playlist/index.js");
const { searchRoutes } = require("./search/index.js");
const songRoutes = require("./song/index.js");
const userRoutes = require("./user/index.js");


const routes = (app) => {
    userRoutes(app)
    songRoutes(app)
    playListRoutes(app)
    searchRoutes(app)
}

module.exports =  routes
