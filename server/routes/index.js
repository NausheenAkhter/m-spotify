import playListRoutes from "./playlist/index.js";
import { searchRoutes } from "./search/index.js";
import songRoutes from "./song/index.js";
import userRoutes from "./user/index.js";

const routes = (app) => {
    userRoutes(app)
    songRoutes(app)
    playListRoutes(app)
    searchRoutes(app)
}

export default routes
