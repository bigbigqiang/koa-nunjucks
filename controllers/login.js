// const database_query = require('../database_query.js')

const jwt = require('jsonwebtoken')
const config = require('../default');

module.exports = {
    'GET /login': async (ctx, next) => {
        // let name = await database_query('SELECT * FROM students');
        // let arr = ['漕灵雁','怀飞丹','汤石英','蒯梓涵','暴尤文','秦水晶','温谷蕊','家婉然','冉可嘉','宿芝英','方水芸','黄莹莹','周飞绿','秦琳芳','国寄灵','游杰秀','王秋月','池淑雅','车听白','车语诗','温浩岚','饶怜梦','戌妍羽','姚妍青','盖慧君','尚高妍','宫翠柔','寿妙春','郑幻珊','濮娇然','慎灵卉','毋柏颜','于贝丽','芮乐丹','扶琳芳','张知睿','韩天韵','融秋柏','劳妍羽','屠惜筠','汲晶婧','侯白柏','濮新波','农友菱','扈凡桃','彭沂秀','许晓旋','蒙和煦','吴凉语','隗孤松','农恨寒','许俊慧','范朗宁','赵多思','何念烟','段清佳','谢卓逸','邰旭妍','乜若烟','桓素昕','牛燕芷','郁嘉玉','武轩秀','卓英秀','焦安吉','蔡婉仪','邱古香','段可佳','邱清怡','江许洌','莘卓婷','容子婧','车晴芳','詹怜翠','何沁舒','桂谷菱','隗妙春','胡诺瑶','韶云水','谭品韵','国吉玟','红琇芳','松有芳','蒋梓珊','薛迎梅','汪密如','萧锌希','贡雁玉','束玄穆','巴迎波','江贞韵','宁晋玉','宫慧雅','盖从阳','黎念烟','盖玟丽','弓陶宜','唐若英','翟雨花','宁淳静']
        // let sql = 'INSERT INTO students (class_id, name, gender, score) VALUES '
        // let queryValue = []
        // for (let i=0;i<arr.length;i++){
        //     let class_id = Math.ceil(Math.random() * 3);
        //     let gender = Math.round(Math.random()) ? 'F' : 'M';
        //     let score = Math.floor(Math.random() * 40 ) + 60;
        //     queryValue.push(`(${class_id},'${arr[i]}','${gender}',${score})`)
        // }
        // console.log(sql + queryValue.join(','))
        // let name = await database_query(sql + queryValue.join(','));
        // let name = await database_query(`UPDATE students SET score=99 WHERE name='小红'`);

        // console.log(JSON.stringify(name))

        ctx.render('login.html', {
            title: 'Login',
            header_text: {
                h1: 'Getting started',
                p: 'Login first!'
            }
        });
    }
};