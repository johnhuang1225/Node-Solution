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
        allowNull: false,
        validate: {
            // len: [2, 20]
            len: {
                args: [10, 25],
                msg: '請輸入介於10到25長度的名字'
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: 'Comming soon...',
        validate: {
            startsWithUpper: function(descValue) {
                var first = descValue.charAt(0);
                var startsWithUpper = first === first.toUpperCase();
                if (!startsWithUpper) {
                    throw new Error('第一個字必須大寫');
                }
            }
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

sequelize.sync({
    force: true,
    logging: console.log
}).then(function () {
    return User.create({
        slug: 1,
        username: 'johnhuang1225',
        description: 'I am a coder, I love coding'
    });
}).catch(function (error) {
    console.log(error);
});


