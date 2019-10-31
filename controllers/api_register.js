const moment = require('moment')
const database_query = require('../database_query.js');

const new_uid = function(mark, max_uid) {
    let current_day = max_uid.slice(1,9);
    let today = moment().format('YYYYMMDD');
    let current_num = max_uid.slice(9);
    let num = '0001'
    if(today === current_day){
        num = (Array(4).join("0") + (parseInt(current_num) + 1)).slice(-4)
    }
    return mark + today + num
}

module.exports = {
    'POST /register': async (ctx, next) => {
        console.log(ctx.request.body)
        let { phone = '', password = '', name = '' } = ctx.request.body
        let response = {
            message: '',
            status: '0',
            data: null,
        }
        if (!phone || !password || !name) {
            response.message = '参数错误'
        } else {
            let sql_check = `SELECT * FROM user WHERE user_name='${name}' OR phone='${phone}'`
            let result_check = await database_query(sql_check);
            if (result_check.length) {
                response.message = '用户名或者电话已存在。'
            } else {
                let max_uid_row = await database_query(`SELECT MAX(id) id, uid FROM user GROUP BY uid ORDER BY uid DESC LIMIT 1`);
                let max_uid = max_uid_row[0].uid
                let sql = `INSERT INTO user (user_name, password, phone, creat_time, uid) VALUES ('${name}','${password}','${phone}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${new_uid('U', max_uid)}')`
                let result = await database_query(sql);
                if (!!result) {
                    console.log('signin ok!');
                    response.message = '注册成功';
                    response.status = '1'
                } else {
                    console.log('signin failed!');
                    response.message = '注册失败';
                }
            }
        }

        ctx.body = response
        await next();
    }
};