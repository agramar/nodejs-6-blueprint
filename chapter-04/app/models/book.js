var dotenv = require('dotenv');
dotenv.load();
var Schema = require('jugglingdb').Schema;
// 이 예제에서는 몽고DB를 사용한다.
var schema = new Schema('mongodb', {url: process.env.MONGODB_URL});

// Books 스키마 설정
var Picture = schema.define('Picture', {
    title: {type: String, length: 255},
    description: {type: Schema.Text},
    category: {type: String, length: 255},
    image: {type: JSON}
});

module.exports = schema;
