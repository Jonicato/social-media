const db = {
    'user': [
        { id: '1', name: 'Carlos'},
        { id: '2', name: 'Jonathan'},
    ]
};

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    
    if(!db[tabla]) {
        db[tabla] = [];
    }

    let index = db[tabla].findIndex(item => item.id === data.id);

    if (index >= 0) {
        let col = await list(tabla);
        if (tabla === "auth") {
            col[index].username = data.username;
        } else if (tabla === "user") {
            col[index].name = data.name;
            col[index].username = data.username;
        }
        index =  {
            id: data.id,
            name: data.name,
            username: data.username
        }
    } else {
        db[tabla].push(data);
    }

    return data;
}

async function remove(tabla, id) {
    const index = db[tabla].findIndex(item => item.id === id);
    if (index >= 0) {
        db[tabla].splice(index, 1);
    }
    return true;
}

async function query(tabla, query) {
    let col = await list(tabla);
    let keys = Object.keys(query);
    let key = keys[0];
    return col.filter(item => item[key] === query[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};