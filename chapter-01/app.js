var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
// 라우트 불러오기
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
// 코멘트 컨트롤러 불러오기
var comments = require('./server/controllers/comments');
// 몽구스 ODM
var mongoose = require('mongoose');
// 세션 저장용 모듈
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// 패스포트와 경고 플래시 메시지 모듈 가져오기
var passport = require('passport');
var flash = require('connect-flash');

var app = express();
// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');
// 데이터베이스 설정
var config = require('./server/config/config.js');
// 데이터베이스 연결
mongoose.connect(config.url);
// 몽고DB가 실행 중인지 체크
mongoose.connection.on('error', function () {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
// 패스포트 설정
require('./server/config/passport')(passport);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
// 정적파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 패트포트용
// 세션용 비밀키
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    // express-session과 connect-mongo를 이용해 몽고DB에 세션 저장
    store: new MongoStore({
        url: config.url,
        collection: 'sessions'
    })
}));
// 패스포트 인증 초기화
app.use(passport.initialize());
// 영구적인 로그인 세션
app.use(passport.session());
// 플래시 메시지
app.use(flash());

app.use('/', routes);
app.use('/users', users);

// 코멘트를 위한 라우트 설정
app.get('/comments', comments.hasAuthorization, comments.list);
app.post('/comments', comments.hasAuthorization, comments.create);

// 404 에러가 잡히면 에러 핸들러에 전송
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 에러 핸들러
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

