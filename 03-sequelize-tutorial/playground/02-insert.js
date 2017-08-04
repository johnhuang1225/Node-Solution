const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql'
});

const Article = sequelize.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.STRING
});

sequelize.sync().then(() => {
    Article.create({
        title: 'title-1',
        body: 'body-1'
    });
});
