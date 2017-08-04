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
    freezeTableName: true
});

sequelize.sync({
    force: true,
    logging: console.log
}).then(() => {
    // User.create({
    //     username: 'johnhuang',
    //     description: 'I am a coder, I love coding'
    // });
});


