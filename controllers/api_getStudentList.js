const database_query = require('../database_query');
const Redis = require('ioredis');

const redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: '123456',
    db: 0
})

function getToken(key){
    return new Promise((resolve, reject)=>{
        redis.get(key).then((result)=>{
            resolve(result)
        })
    })
    
}

module.exports = {
    'POST /getStudentList': async (ctx, next) => {
        let uid = ctx.request.body.uid || '';
        console.log(uid)
        if(uid){
            let result = await getToken(uid);
            console.log('result',result)
            if(result){
                let sql = `SELECT s.id, s.name, s.gender,s.score, c.class_name, c.name teacherName, c.phone teacherPhone FROM students s INNER JOIN (SELECT c.id, c.class_name, t.name, t.phone FROM class c INNER JOIN teacher t ON c.id = t.class_id) c ON s.class_id = c.id;`
                let result = await database_query(sql);
                if (result.length) {
                    console.log('signin ok!');
                    ctx.body = {
                        message: '获取学生列表',
                        status: '1',
                        data:{
                            list: result
                        },
                    }
                }
            } else {
                ctx.body = {
                    message: '登录信息已过期',
                    status: '0',
                    data:null,
                }
            }
        } else {
            ctx.body = {
                message: '参数错误',
                status: '0',
                data:null,
            }
        }
        await next();
    }
};