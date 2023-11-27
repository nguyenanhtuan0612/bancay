const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' });

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
};

module.exports = config;
