const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', secure('post'), upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list(req, res, next) {
    Controller.list()
        .then(data => response.success(req, res, data, 200))
        .catch(next);
};

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(next);
};

function upsert(req, res, next) {
    Controller.upsert(req.user.id, req.body)
        .then(post => response.success(req, res, post, 200))
        .catch(next);
};

function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then(post => response.success(req, res, post, 200))
        .catch(next);
};

module.exports = router;