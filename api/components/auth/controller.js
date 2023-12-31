const bcrypt = require('bcryptjs');
const auth = require('../../../auth');

const TABLA = 'auth';

module.exports = function(injectedStore) {
    let store =  injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const info = await store.query(TABLA, { username: username });
        const data = info[0];

        return bcrypt.compare(password, data.password)
            .then(equals => {
                if (equals === false) {
                    throw new Error('Información inválida');
                }
                delete data.password;
                return auth.sign(data);
            })
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login,
    }
}