const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = require('../');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
        hooks: {
            beforeCreate: setSaltAndPassword,
            beforeUpdate: setSaltAndPassword
        }

});

User.prototype.sanitize = () => _.omit(this.toJSON(), ['password', 'salt']);
User.prototype.correctPassword = candidatePassword => this.Model.encryptPassword(candidatePassword, this.salt) === this.password;

User.generateSalt = () => crypto.randomBytes(16).toString('base64');
User.encryptPassword = (plainText, salt) => {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password, user.salt);
    }
}

module.exports = User;