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

* Python 3.8
* Django 3.0.2
* Django REST Framework 3.11.0


### Frontend

* NodeJS v13
* React 16.13.1
* React Native 0.62.2
* [Optional Chaining](https://github.com/tc39/proposal-optional-chaining)
* [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing)


개발환경 구축
--------------

### 설치

* [Poetry 설치](https://python-poetry.org/docs/#installation) 후 진행

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

# Frontend 의존성 설치
npm install
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

* Android: my_app_frontend/android 를 Android Studio로 한번 열어줘야 정상 실행 됨
* iOS: cd my_app_frotnend/ios && pod install 한번 실행한 이후 실행 가능


```
cd my_app_frontend

# 웹 화면 실행
npm run web

# iOS 앱 실행
npm run ios

# 안드로이드 앱 실행
npm run android
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
MY_APP_SECRET_KEY=changeme

# Django Debug Flag
MY_APP_DEBUG=true

# 접속 허용 호스트 지정
MY_APP_HOSTS=myapp.bigbot.kr

# Django Timezone 설정
MY_APP_TIMEZONE=Asia/Seoul
```

#### Frontend

* my_app_frontend/.env.development
* my_app_frontend/.env.production

개발/프로덕션 및 OS별로 다르게 지정할 수 있음.

```
API_SERVER_WEB=/api/v1/
API_SERVER_IOS=http://127.0.0.1:8000/api/v1/
API_SERVER_ANDROID=http://127.0.0.1:8000/api/v1/
```

TIP: Android에서 API 서버 접속시 다음 명령어 활용:

```
adb reverse tcp:8000 tcp:8000
```

#### Docker

.env 파일 생성

```
# docker-compose 프로젝트 이름
COMPOSE_PROJECT_NAME=my_app

# 노출될 웹서버 포트
MY_APP_DOCKER_PORT=8080

# true로 설정시 frontend 빌드하지 않고 backend만 활성화 됨
MY_APP_DOCKER_BACKEND_ONLY=false

# Backend/WebServer Timezone 설정
MY_APP_TIMEZONE=Asia/Seoul
```


개발 문서
-------------

개발 문서 빌드시 외부 프로그램 설치가 필요함(문서 내 그래프 이미지 자동생성 관련)

* [PlantUML](https://plantuml.com) - jar 다운받아서 환경변수 PLANTUML(또는 my_app_document/.env 에 PLANTUML) 경로 추가
* [GraphViz](https://www.graphviz.org) - 설치 후 PATH에 추가

아래 명령어를 실행하면 my_app_document/build/ 폴더에 html 파일로 생성됨.

```
poetry shell
cd my_app_document
npm install
npm run build
```

Visual Studio Code
------------------

* 브라우저 디버그 시 Frontend (NodeJS) 실행중인 상태에서 Launch Firefox/Launch Chrome 실행
* Firefox 디버그 시 브라우저 설정 변경 필요함(https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug) 참조



Troubleshooting
-------------------

### React Native에서 .env 변경 내용이 반영되지 않음
```
npm run native -- --reset-cache
```


변경사항
----------

### v3

* React-Native 기반 Frontend 환경 재구축


### v2

* Backend/Frontend 완전 분리(django-webpack-loader 사용 안함)
* Visual Studio Code Workspace 설정(Firefox/Chrome 디버그 설정 포함)
