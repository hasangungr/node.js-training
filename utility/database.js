


const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app2', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;

