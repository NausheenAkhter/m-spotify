const dotenv = require("dotenv");
const express = require('express');
const connectToDb = require('./db.js');
const routes = require("./routes/index.js");
const cors = require('cors');
require('express-async-errors');


dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

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