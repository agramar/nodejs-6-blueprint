// 환경설정 불러오기
var dotenv = require('dotenv');
dotenv.load();

// 데이터베이스 URL
module.exports = {
    'url' : process.env.MONGODB_URL
};
