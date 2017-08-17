// 예제 모델
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocationSchema = new Schema({
    title: String,
    // 좌표를 저장하는 GeoJSON 형식
    coordinates: {
        type: [Number],
        // 2dsphere에 대한 자세한 내용은 https://docs.mongodb.com/manual/core/2dsphere
        index: '2dsphere'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Location', LocationSchema);

