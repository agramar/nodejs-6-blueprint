// 모듈 불러오기
var fs = require('fs');
var mine = require('mime');
// 이메일에서 Gravatar 아이콘 얻기
var gravatar = require('gravatar');
var Images = require('../models/images');
// 이미지 파일 형식 설정
var IMAGES_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// 이미지 갤러리 보여주기
exports.show = function (req, res) {
	Images.find().sort('-created').populate('user', 'local.email').exec(function (error, images) {
		if (error) {
			return res.status(400).send({
				message: error
			});
		}
		// 갤러리 렌더링
		res.render('images-gallery', {
			title: 'Images Gallery',
			images: images,
			gravatar: gravatar.url(images.email, {s: '80', r: 'x', d: 'retro'}, true)
		});
	});
};

// 이미지 업로드
exports.uploadImage = function (req, res) {
	var src, dest, targetPath, targetname;
	var tempPath = req.file.path;
	console.log(req.file);
	// 파일의 MIME 형식 얻기
	var type = mime.lookup(req.file.mimetype);
	// 파일 확장자 얻기
	var extension = req.file.path.split('/[. ]+/]').pop();
	// 지원하는 파일 형식인지 확인
	if (IMAGE_TYPES.indexOf(type) == -1) {
		return res.status(415).send('Suppoted image formats: jpeg, jpg, jpe, png.');
	}
	// 이미지의 새 경로 설정
	targetPath = './public/images/' + req.file.originalname;
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
		var image = new Images(req.body);
		// 이미 파일 이름 설정
		image.imageName = req.file.originalname;
		// 현재 사용자 (id) 설정
		image.user = req.user;
		// 수신 데이터 저장
		image.save(function (error) {
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
		res.redirect('images-gallery');
	});
};

// 이미지 인증 미들웨어
exports.hasAuthorization = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};
