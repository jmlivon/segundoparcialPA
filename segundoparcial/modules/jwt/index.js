const jwt = require('jsonwebtoken');
const secret = 'asdasd';

module.exports.sign = sign;
function sign(payload){
    return jwt.sign(payload, secret);
}

module.exports.verify = verify;
function verify(token){
    try {
        var decoded = jwt.verify(token, secret);

        return decoded;

    } catch(error){
        return false;
    }
}