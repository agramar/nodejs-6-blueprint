module.exports = function(Review) {
    // 종단점 메서드 비활성화 시키기
    // 보다 자세한 정보는 http://loopback.io/doc/en/lb3/Exposing-models-over-REST.html
    Review.disableRemoteMethod("count", true);
    Review.disableRemoteMethod("exists", true);
    Review.disableRemoteMethod("findOne", true);
    Review.disableRemoteMethod("createChangeStream", true);
    Review.disableRemoteMethod("updateAll", true);
};
