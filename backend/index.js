const express = require('express');
const mainRouter = require('./routes/index');


const app = express();

app.use("/api/vi", mainRouter)