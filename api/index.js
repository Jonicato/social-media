require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const errors = require('../network/errors.js')

const user = require('./components/user/routes.js');
const auth = require('./components/auth/routes.js');

const app = express();

app.use(bodyParser.json());

// Router
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});