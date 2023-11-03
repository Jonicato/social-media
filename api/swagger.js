const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    // List of files to be processed.
    apis: ['./components/user/routes.js'],
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    basePath: '/',
    swaggerDefinition: {
        info: {
            description: 'SocialMedia Swagger API',
            swagger: '2.0',
            title: 'Dessert API',
            version: '1.0.0',
        },
    },
};
const specs = swaggerJsdoc(options);
module.exports =  specs;