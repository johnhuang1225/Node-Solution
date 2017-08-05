const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql'
});

const Member = sequelize.define('member', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    freezeTableName: true,
    hook: {
        afterValidate: function(member) {
            member.password = bcrypt.hashSync(member.password, 8);
        }
    }
});

sequelize.sync({
    force: true,
    logging: console.log
}).then(() => {
    return Member.create({
        username: 'jessica',
        password: '12345'
    });
}).catch((error) => {
    console.log(error);
});
