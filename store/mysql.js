const mysql = require('mysql2');

const config = require('../config');
const err = require('../utils/error');

const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.db,
};

// Connect

let connection;

function handleConn() {
    connection = mysql.createConnection(dbconfig);

    connection.connect(err => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleConn, 2000);
        } else {
            console.log('DB Connected');
        }

    });

    connection.on('error', err => {
        console.error('[db err]', err); 
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConn();
        } else {
            throw err;
        }
    })
}

handleConn();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        })
    })
}

async function upsert(table, data) {
    let row;

    if(data.id) {
        row = await get(table, data.id);
        if (row.length !== 0) {
            return update(table, data);
        }
    }

    if(data.user_to) {
        row = await get('user', data.user_to);
        if (row.length === 0) {
            throw err('No se encontró el usuario a seguir', 404);
        }
    }

    return insert(table, data)
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        })
    })
}

function query(table, query, join) {
    let joinQuery = '';
    if(join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`, query
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if(err) return reject(err);

            resolve(res || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}