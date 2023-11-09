import songRoutes from "./song/index.js";
import userRoutes from "./user/index.js";

const routes = (app) => {
    userRoutes(app)
    songRoutes(app)
}

export default routes
