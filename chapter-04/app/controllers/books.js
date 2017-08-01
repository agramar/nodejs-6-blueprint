var express = require('express'),
    router = express.Router(),
    schema = require('../models/book'),
    Picture = schema.models.Picture,
    cloudinary = require('cloudinary').v2,
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

module.exports = function (app) {
    app.use('/', router);
};

// picture 목록 가져오기
router.get('/books', function (req, res, next) {
    Picture.all().then(function (photos) {
        console.log(photos);
        // 클라우디너리 API를 사용하려면 뷰에 cloudinary 변수를 전달해야 한다.
        res.render('book/books', {
            title: 'PhotoBook',
            photos: photos,
            cloudinary: cloudinary
        })
    });
});

// 폼 업로드 가져오기
router.get('/books/add', function (req, res, next) {
    res.render('book/add-photo', {
        title: 'Upload Picture'
    });
});

// 게시하기
router.post('/books/add', multipartMiddleware, function (req, res, next) {
    // 수신한 파일 확인
    console.log(req.files);
    // Picture 모델 생성하기
    var photo = new Picture(req.body);
    // 임시 파일 경로 가져오기
    var imageFile = req.files.image.path;
    // 클라우디너리로 파일 업로드
    cloudinary.uploader.upload(imageFile, {
        tags: 'photobook',
        folder: req.body.category + '/',
        public_id: req.files.image.originalFilename
        // eager: {
        //     width: 280, height: 200, crop: "fill", gravity: "face"
        // }
    }).then(function (image) {
        console.log('Picture uploaded to Cloudinary');
        // 이미지 Json파일 확인하기
        console.log(image);
        // picture 모델에 이미지 정보 추가하기
        photo.image = image;
        // 사진과 이미지 메타데이터 저장하기
        return photo.save();

        // multipartMiddleware를 사용해서 가장 올바르고 효과적으로 구현하려면, 클라우드에 업로드하는 각각의 파일을 정리해야 한다.
    }).then(function (photo) {
        console.log('Successfully saved');
        // 로컬 폴더에서 이미지 삭제
        // 멀터파트 연결을 사용하면 기본적으로 이미지가 하드 드라이브의 폴더에 로드되므로 애플리케이션이 로드한 모든 파일을 항상 삭제해야 한다.
        var filePath = req.files.image.path;
        fs.unlinkSync(filePath);
    }).finally(function () {
        // 이미지 파일 및 결과 보여주기
        res.render('book/posted-photo', {
            title: 'Upload with Success',
            photo: photo,
            upload: photo.image
        });
    });
});
