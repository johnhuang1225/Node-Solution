const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('connect to mysql success');
        sequelize.close();
    })
    .catch((err) => {
        console.log('connect to mysql fail');
    });

