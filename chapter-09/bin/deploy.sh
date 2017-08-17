#!/bin/bash
set -o errexit # 오류 발생시 종료
npm run build # 자바스크립트와 CSS의 번들 생성
git push heroku master # 해로쿠에 배포
