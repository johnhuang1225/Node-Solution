const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    slug: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: 'Comming soon...'
    }
}, {
    timestamps: false,
    freezeTableName: true,
    hooks: {
        beforeValidate: function() {
            console.log('beforeValidate');
        },
        afterValidate: function() {
            console.log('afterValidate');
        },
        beforeCreate: function() {
            console.log('beforeCreate');
        },
        afterCreate: function(res) {
            console.log('afterCreate: Created user with slug', res.dataValues.slug);
        }
    }
});

sequelize.sync({
    force: true,
    logging: console.log
}).then(() => {
    User.create({
        slug: 1,
        username: 'johnhuang',
        description: 'I am a coder, I love coding'
    })
}).catch((error) => {
    console.log(error);
});


