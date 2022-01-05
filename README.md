bigtree_app_template
=======================

![스크린샷](bigtree_app_template.png)

Django Backend / React Frontend 를 사용하는 앱 템플릿

* Django Backend
* React Frontend
* React Native iOS/Android App
* Docker 배포 지원

구성
-------

### Backend

* Python 3.9
* Django
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
* SASS



개발환경 구축
--------------

### 설치

* [Poetry](https://python-poetry.org), [Yarn](https://yarnpkg.com) 설치


### 템플릿 복제

명령어를 통해 git clone 하거나 [템플릿 생성](https://github.com/ibigtree/bigtree_app_template/generate) 기능 사용

```bash
git clone git@github.com:ibigtree/bigtree_app_template.git my_app
```

### 초기화

```bash
cd my_app

python init.py
# 대화상자에서 앱 및 패키지 이름 입력
# App Name(example: bigtree_app): my_app
# Package Name(example: kr.ibigtree.app): kr.ibigtree.my_app

# Git 저장소 초기화 (GitHub Template 기능 사용해 복제한 경우 건너뜀)
rm -rf .git  # Windows: rmdir .git /S
git init

# init.py 삭제
rm init.py  # Windows: del init.py

# poetry 없을 경우 먼저 설치
pip install poetry

# Backend 의존성 설치
poetry install

# Yarn 없을 경우 Yarn 먼저 설치
npm install -g yarn

# Frontend 의존성 설치
yarn
```

실행
-----------

### Backend
```
# 바로 실행
poetry run python manage.py runserver

# virtualenv 활성화 후 실행
poetry shell
python manage.py runserver
```

### Frontend

* Android: bigtree_app_frontend/android 를 Android Studio로 한번 열어줘야 정상 실행 됨
* iOS: cd bigtree_app_frontend/ios && pod install 로 Naitve 의존성 설치 먼저 진행해야 함


```
cd bigtree_app_frontend

# 웹 화면 실행
yarn start:web

# iOS 앱 실행
yarn start:ios

# 안드로이드 앱 실행
yarn start:android
```

환경설정
------------

### Backend

환경 변수 및 dotenv를 사용할 수 있으며 다음과 같은 우선순위를 가짐

1. 직접 정의된 환경 변수
2. `.env`

Docker 빌드 시에는 `.env` 이미지에 파일은 복사되지 않는다.

```
# Django Secret Key
BIGTREE_APP_SECRET_KEY=changeme

# Django Debug Flag
BIGTREE_APP_DEBUG=true

# 접속 허용 호스트 지정
BIGTREE_APP_HOSTS=myapp.bigbot.kr

# Timezone 설정
TZ=Asia/Seoul
```

### Frontend

Frontend는 dotenv를 사용한다. 환경변수를 직접 사용하지는 않고 실행/빌드 시 [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)를 사용해 `@env` 모듈에 주입된다. (app/Config.ts 파일 참조)

설정값은 다음 우선순위를 따른다.

1. `.env.development`: 디버그(start:web 등) 모드에서만 적용됨
2. `.env.production`: 프로덕션 빌드(build:web) 모드에서만 적용됨
3. `.env`

Docker 이미지 빌드 시에는 `.env.production`만 이미지 내로 복사된다.

```
API_SERVER=http://172.30.1.100:8000/api/v1
```

팁: localhost(127.0.0.1)가 아닌 LAN IP를 입력해야 다른 기기(iOS/Android) 에서 디버깅하기 편함

Docker
------------

### 실행

```
# docker 통해 실행시 media, static 경로 필요함
mkdir media
mkdir static

docker-compose build
docker-compose up -d
```

### 환경설정

docker-compose는 기본적으로 `.env` 파일만 인식하며 다른 파일명을 사용할 경우 `--env-file` 옵션을 사용한다.


```
# docker-compose 프로젝트 이름
COMPOSE_PROJECT_NAME=bigtree_app

# 노출될 웹서버 포트
BIGTREE_APP_DOCKER_PORT=8080

# true로 설정시 frontend 빌드 건너뜀
BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD=true

# Backend/WebServer Timezone 설정
TZ=Asia/Seoul
```


### Frontend 빌드

Docker를 사용해 Frontend 빌드 가능

```
cd bigtree_app_frontend
docker-compose up --build
```


개발 문서
-------------

Windows 이외 운영체제의 경우 graphviz 설치가 필요할 수 있음(참조: https://plantuml.com/ko/graphviz-dot)

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


변경사항
----------

### v7

Docker 구조 정리


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
