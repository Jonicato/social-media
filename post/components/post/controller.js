const nanoid = require('nanoid');

const TABLA = 'post';

module.exports = function(injectedStore) {
    let store =  injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(user, body) {
        const post = {
            text: body.text,
            user: user,
        }

        if (body.id) {
            post.id = body.id;
        } else {
            post.id = nanoid();
        }

        return store.upsert(TABLA, post);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    }

}