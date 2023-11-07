const axios = require('axios');


function CreateRemoteDB(host, port) {
    const remoteDataBaseCall = axios.create({
        baseURL: `http://${host}:${port}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    async function request({ method, url, data }) {
        const reponse = await remoteDataBaseCall({
            method: method,
            url: url,
            data: data
        });
        return reponse.data.body;
    }

    function list(table) {
        return request({
            method: 'GET',
            url: `/${table}`,
        })
    }

    function get(table, id) {
        return request({
            method: 'GET',
            url: `/${table}/${id}`
        })
    }

    function query(table, query, join) {
        let data = query;
        return request({
            method: 'POST',
            url: `/query/${table}`,
            data
        })
    }

    function upsert(table, data) {
        return request({
            method: 'POST',
            url: `/${table}`,
            data
        })
    }

    return {
        list,
        get,
        query,
        upsert,
    }

}

module.exports = CreateRemoteDB;