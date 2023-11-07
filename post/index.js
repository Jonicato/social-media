require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const errors = require('../network/errors.js')

const post = require('./components/post/routes.js');

const app = express();

app.use(bodyParser.json());

// Router
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', config.post.port);
});