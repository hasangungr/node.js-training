const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('product', { //sequelize model
    id:
    {
        type: Sequelize.INTEGER,
        autorIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});


module.exports = Product;
