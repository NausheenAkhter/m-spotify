import dotenv from "dotenv";
import Express from 'express'
import connectToDb from './db.js'
import routes from "./routes/index.js";
import cors from 'cors';
import 'express-async-errors'; // Import and configure express-async-errors

dotenv.config();
const app = Express()
app.use(cors())
app.use(Express.json())

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})
connectToDb()
routes(app)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
})
process.on('uncaughtException', () => {
    console.log('error......');
})