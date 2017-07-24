const Sequelize = require('sequelize')

const db = require('../');

module.exports = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
