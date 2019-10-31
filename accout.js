const jwt = require('jsonwebtoken')
const config = require('./default');

const getToken = (payload = {}, outTime) => {
    return jwt.sign(payload, config.secretOfToken, { expiresIn: outTime })
}

const decodeToken = (token) => {
    return new Promise((resolve, reject)=>{
        jwt.verify(token, config.secretOfToken, function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token
                resolve(null)           
            } else {
                resolve(decode)
            }
        })
    })
}

module.exports.decodeToken = decodeToken


module.exports.getToken = getToken 