const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error(error.message);
    }
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);

        // Comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No tienes los permisos para realizar esta acción', 401);
        }
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene el token', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato inválido', 401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};