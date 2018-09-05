const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB_URL = process.env.DB_URL || require('./config').DB_URL;
const apiRouter = require('./routes/api-routes');

mongoose.connect(DB_URL, { useNewUrlParser: true })
.then(console.log('connected to Mongo'));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    res.status(404).send({message: 'Page Not Found'});
})

app.use((err, req, res, next) => {
    if (err.status) res.status(err.status).send({message: err.message});
    else res.status(500).send({message: 'Internal Server Error'});
});

module.exports = app;