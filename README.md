bigtree_app_template
=======================

![스크린샷](bigtree_app_template.png)

Django Backend / React Frontend 를 사용하는 앱 템플릿

* Django, Django REST Framework 기반 Backend
* Docker 기반 배포 지원
* React 기반 Frontend
* React Native 기반 iOS/Android App


구성
-------

### Backend

* Python 3.9
* Django
* Django REST Framework
* Docker (nginx, gunicorn)
* sphinx(문서화)


### Frontend

* NodeJS v14
* React
* React Native
* TypeScript
* TypeDoc(문서화)
* [Emotion](https://emotion.sh/)
* [Tailwind CSS](https://tailwindcss.com/)
* [twin.macro](https://github.com/ben-rogerson/twin.macro)
* SASS



개발환경 구축
--------------

### 설치

* [Poetry 설치](https://python-poetry.org/docs/#installation), [Yarn](https://yarnpkg.com) 설치

Backend가 필요 없는 프로젝트의 경우 init 후 frontend 부분만 사용하면 됩니다.

```
git clone git@github.com:ibigtree/bigtree_app_template.git my_app

cd my_app

python init.py
# 대화상자에서 앱 및 패키지 이름 입력
# App Name(example: bigtree_app): my_app
# Package Name(example: kr.ibigtree.app): kr.ibigtree.my_app

# Git 저장소 초기화
rm -rf .git
git init

# poetry 없을 경우 먼저 설치
pip install poetry

# Backend 의존성 설치
poetry install

# Yarn 없을 경우 머저 설치
npm install -g yarn

# Frontend 의존성 설치
yarn
```

### 실행

#### Backend
```
poetry run python manage.py runserver
# or
poetry shell
python manage.py runserver
```

#### Frontend

* Android: bigtree_app_frontend/android 를 Android Studio로 한번 열어줘야 정상 실행 됨
* iOS: cd bigtree_app_frontend/ios && pod install 한번 실행한 이후 실행 가능


```
cd bigtree_app_frontend

# 웹 화면 실행
npm run start:web

# iOS 앱 실행
npm run start:ios

# 안드로이드 앱 실행
npm run start:android
```

### Docker

```
docker-compose up -d --build
```


### 환경설정

#### Backend

.env 파일 생성

```
# Django Secret Key
BIGTREE_APP_SECRET_KEY=changeme

# Django Debug Flag
BIGTREE_APP_DEBUG=true

# 접속 허용 호스트 지정
BIGTREE_APP_HOSTS=myapp.bigbot.kr

# Django Timezone 설정
BIGTREE_APP_TIMEZONE=Asia/Seoul
```

#### Frontend

```
API_SERVER=http://172.30.1.100:8000/api/v1
```

팁: localhost(127.0.0.1)가 아닌 LAN IP 사용하면 iOS/Android 기기에서 접속하기 좋습니다.

#### Docker

.env 파일 생성

```
# docker-compose 프로젝트 이름
COMPOSE_PROJECT_NAME=bigtree_app

# 노출될 웹서버 포트
BIGTREE_APP_DOCKER_PORT=8080

# true로 설정시 frontend 빌드하지 않고 backend만 활성화 됨
BIGTREE_APP_DOCKER_BACKEND_ONLY=false

# Backend/WebServer Timezone 설정
BIGTREE_APP_TIMEZONE=Asia/Seoul
```



개발 문서
-------------

### Backend

개발 문서 빌드시 외부 프로그램 설치가 필요함(문서 내 그래프 이미지 자동생성 관련)

* [PlantUML](https://plantuml.com) - jar 다운받아서 환경변수 PLANTUML(또는 bigtree_app_document/.env 에 PLANTUML) 경로 추가
* [GraphViz](https://www.graphviz.org) - 설치 후 PATH에 추가

아래 명령어를 실행하면 bigtree_app_document/build/ 폴더에 html 파일로 생성됨.

```
poetry shell
cd bigtree_app_document
yarn build
```


Visual Studio Code
------------------

* 브라우저 디버그 시 Frontend (NodeJS) 실행중인 상태에서 Launch Firefox/Launch Chrome 실행
* Firefox 디버그 시 브라우저 설정 변경 필요함(https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug) 참조



Troubleshooting
-------------------

### React Native에서 .env 변경 내용이 반영되지 않음

Metro Bundler가 이미 실행중인 경우 반영이 안 될 수 있습니다.

실행중인 Metro Bundler를 종료하고 다시 실행합니다.


변경사항
----------

### v6
* 전반적으로 설정파일 정리
* .env 파일 통합 및 캐시 문제 해결

### v5
* styled-components 대신 Emotion 사용
* Tailwind CSS 추가

### v4
* TypeScript 기반으로 변경
* sass-loader 기본 탑재
* TypeDoc을 사용한 문서화


### v3.1.0

* JSDoc을 Frontend 쪽으로 분리. 더이상 Frontend 문서를 같이 빌드하지 않음.
* [babel-plugin-jsx-control-statements](https://www.npmjs.com/package/babel-plugin-jsx-control-statements) 삭제. 자동완성이 안되는 등 문제가 있어 삭제함. 필요시 직접 설치.


### v3

* React-Native 기반 Frontend 환경 재구축


### v2

* Backend/Frontend 완전 분리(django-webpack-loader 사용 안함)
* Visual Studio Code Workspace 설정(Firefox/Chrome 디버그 설정 포함)
