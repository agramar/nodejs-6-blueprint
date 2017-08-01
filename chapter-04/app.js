var express = require('express');
var config = require('./config/config');
var app = express();

require('./config/express')(app, config);
// 클라우디너리 환경 설정 가져오기
require('./config/env')(app);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
