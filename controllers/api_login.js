const database_query = require('../database_query');
const { getToken } = require('../accout');

module.exports = {
    'POST /login': async (ctx, next) => {
        console.log(ctx.request.body)
        let phone = ctx.request.body.phone || '', password = ctx.request.body.password || '';
        if(!phone || !password){
            ctx.body = {
                message: '参数错误',
                status: '0',
                data:null,
            }
            await next();
        } else {
            let sql = `SELECT * FROM user WHERE phone=${phone} AND password=${password}`
            let result = await database_query(sql);
            let token = getToken({ uid: result[0].uid }, 60*5) // 将关键信息记录与 Token 内
            console.log(token)
            ctx.cookies.set('token', token)
            if (result.length) {
                console.log('signin ok!');
                ctx.body = {
                    message: '登陆成功',
                    status: '1',
                    data:{
                        token,
                        uid: result[0].uid
                    },
                }
            } else {
                console.log('signin failed!');
                ctx.body = {
                    message: '登陆失败',
                    status: '0',
                    data:null,
                }
            }
            await next();
        }
    }
};