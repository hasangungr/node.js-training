// const mysql = require('mysql2');


// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',

// });



// module.exports = connection.promise();



const Sequelize = require('sequelize');

const sequelize = new Sequelize(' ','',' ',{
    dialect: ' ',
    host:' '
});


module.exports = sequelize;

