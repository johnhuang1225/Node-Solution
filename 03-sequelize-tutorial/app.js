const Sequelize = require('sequelize');

// const sequelize = new Sequelize('nodejs', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 1,
//         idle: 10000
//     }
// });

// 預設是mysql
const sequelize = new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql'
});

// 定義schema
const User = sequelize.define('user', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    email: Sequelize.STRING
});

// 同步資料庫
sequelize.sync();

// 同步資料庫並插入數據
sequelize.sync()
    // .then(() => {
    //     User.create({
    //         name: 'john',
    //         age: 43,
    //         email: 'johnhuang@chenbro.com'
    //     });
    // });

// 測試連接資料庫
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('連接 MySQL 資料庫成功');
//     })
//     .catch(err => {
//         console.log('連接失敗');
//     });
