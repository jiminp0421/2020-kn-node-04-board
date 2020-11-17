//crypt 
//cipher
//session
//cookie
//CORS (Cross Origin Resource Shart)
//proxy - forward proxy 
//proxy - reverse proxy

const crypto = require('crypto');
let password = 'abcd1234';
let salt = 'sdfgkjdfljgef1234||sdf';
let hash = crypto.createHash('sha512').update(password+salt).digest('base64');
console.log(hash);

const cipher = crypto.createCipher('aes-256-cbc', salt);
let result = cipher.update('아버지를 아버지라...', 'utf-8', 'base64');
result += cipher.final('base64');
console.log(result);

let dicipher = crypto.createDecipher('aes-256-cbc', salt);
let result2 = dicipher.update(result, 'base64', 'utf-8');
result2 += dicipher.final('utf-8');
console.log(result2);