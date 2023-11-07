const config = require('../../../config');
let store;
if(config.remoteDB == true) {
    store = require('../../../store/remote-mysql');
} else {
    const store = require('../../../store/mysql');
}
const controller = require('./controller');

module.exports = controller(store);