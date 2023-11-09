import { search } from "../../controller/search/index.js"
import auth from "../../middleware/auth/index.js"

const searchRoutes = (app) => {
    app.get('/api', auth, search)
}

export { searchRoutes }