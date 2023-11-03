module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "notansecret",
    },
    mysql: {
        host: process.env.MYSQL_HOST || "127.0.0.1",
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASS || "",
        db: process.env.MYSQL_DB || "socialmedia",
    }
}