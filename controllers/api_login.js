const database_query = require('../database_query');
// const { getToken } = require('../accout');
const { aesEncrypt, aesDecrypt } = require('../crypto');
const Redis = require('ioredis');

const redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: '123456',
    db: 0
})

function setToken(key, value, timeout){
    return new Promise((resolve, reject)=>{
        const pipeline = redis.pipeline();
        pipeline.set(key, value)
        pipeline.expire(key, timeout)
        pipeline.exec((err, results)=>{
            if(err){
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
    
}

module.exports = {
    'POST /login': async (ctx, next) => {
        let phone = ctx.request.body.phone || '', password = ctx.request.body.password || '';
        if (!phone || !password) {
            ctx.body = {
                message: '参数错误',
                status: '0',
                data: null,
            }
            await next();
        } else {
            let sql = `SELECT * FROM user WHERE phone=${phone} AND password=${password}`
            let result = await database_query(sql);

            // let token = getToken({ uid: result[0].uid }, 60*5) // 将关键信息记录与 Token 内
            // console.log(token)
            // ctx.cookies.set('token', token)

            if (result.length) {

                let data = JSON.stringify({ loinTime: Date.now() });
                let key = 'Password!';
                let encrypted = aesEncrypt(data, key);
                // var decrypted = aesDecrypt(encrypted, key);
                let results = await setToken(result[0].uid, encrypted, 30)
                console.log(results)
                ctx.body = {
                    message: '登陆成功',
                    status: '1',
                    data: {
                        // token,
                        uid: result[0].uid
                    },
                }
                console.log('Encrypted text: ' + encrypted);
                // console.log('Decrypted text: ' + decrypted);


            } else {
                console.log('signin failed!');
                ctx.body = {
                    message: '登陆失败',
                    status: '0',
                    data: null,
                }
            }
            await next();
        }
    }
};