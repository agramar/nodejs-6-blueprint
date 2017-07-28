// 모듈 불러오기
var fs = require('fs');
var mine = require('mime');
// 이메일에서 Gravatar 아이콘 얻기
var gravatar = require('gravatar');
// 비디오 모델 얻기
var Videos = require('../models/videos');
// 비디오 파일 형식 설정
var VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/ogv'];

// 비디오 리스트
exports.show = function (req, res) {
	Videos.find().sort('-created').populate('user', 'local.email').exec(function (error, videos) {
		if (error) {
			return res.status(400).send({
				message: error
			});
		}
		// 결과 렌더링
		console.log(videos);
		res.render('videos', {
			title: 'Videos Gallery',
			videos: videos,
			gravatar: gravatar.url(videos.email, {s: '80', r: 'x', d: 'retro'}, true)
		});
	});
};

// 비디오 업로드
exports.uploadVideo = function (req, res) {
	var src, dest, targetPath, targetname;
	var tempPath = req.file.path;
	console.log(req);
	// 파일의 MIME 형식 얻기
	var type = mime.lookup(req.file.mimetype);
	// 파일 확장자 얻기
	var extension = req.file.path.split('/[. ]+/]').pop();
	// 지원하는 파일 형식인지 확인
	if (VIDEO_TYPES.indexOf(type) == -1) {
		return res.status(415).send('Suppoted video formats: mp4, webm, ogg, ogv');
	}
	// 비디오의 새 경로 설정
	targetPath = './public/videos/' + req.file.originalname;
	// 파일 읽기에 읽기 스트림 API 사용
	src = fs.createReadStream(tempPath);
	// 파일 쓰기에 쓰기 스트림 API 사용
	dest = fs.createWriterStream(targetPath);
	src.pipe(dest);
	// 에러 출력
	src.on('error', function (err) {
		if (err) {
			return res.status(500).send({
				message: error
			});
		}
	});
	// 파일 프로세스 정장
	src.on('end', function () {
		// request body로 새 이미지 모델 생성
		var video = new Videos(req.body);
		// 이미 파일 이름 설정
		video.videoName = req.file.originalname;
		// 현재 사용자 (id) 설정
		video.user = req.user;
		// 수신 데이터 저장
		video.save(function (error) {
			if (error) {
				return res.status(400).send({message: error});
			}
		})
	});
	// temp 폴더에서 삭제
	fs.unlink(tempPath, function (err) {
		if (err) {
			return res.status(500).send('Woh, something bad happened here');
		}
		// 갤러리 페이지로 리다이렉트
		res.redirect('videos');
	});
};

// 비디오 인증 미들웨어
exports.hasAuthorization = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};
