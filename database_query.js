const mysql = require('mysql');

const config = require('./default.js');

const db = {}

function createConnection(){
    let connection = mysql.createConnection({
        host: config.database.HOST,
        user: config.database.USERNAME,
        password: config.database.PASSWORD,
        database: config.database.DATABASE
    })
    return connection;
}

db.connection = createConnection()

db.connection.connect();  //创建连接


function check_is_connected(){
    return new Promise((resolve, reject)=>{
        db.connection.query('SELECT 1', function (error, results, fields) {
            if (error) throw error;
            // connected!
            resolve(results);
        });
    })
}

const database_query = async function (sql) {

    let is_connected = await check_is_connected();
    if(!is_connected){
        db.connection = createConnection()
        db.connection.connect();  //创建连接
    }

    return new Promise((resolve, reject) => {
        db.connection.query(sql, function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err.message)
            }
            console.log('--------------------------SELECT----------------------------');
            resolve(results)
            console.log('------------------------------------------------------------');

        });
    });
}

module.exports = database_query;