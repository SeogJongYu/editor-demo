bigtree_app_template_v2
=======================
Django Backend / React Frontend 를 사용하는 앱 템플릿


Backend
-------

### Software Version

* Python 3.8
* Django 3.0.2
* Django REST Framework 3.11.0


Frontend
-------

### Software Version
* NodeJS v13
* React 16.12.0

### 환경 구성
* [Optional Chaining](https://github.com/tc39/proposal-optional-chaining), [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) 사용 가능


v2 변경사항:
------------

* Backend/Frontend 완전 분리(django-webpack-loader 사용 안함)
* create-react-app 사용
* Visual Studio Code Workspace 설정(Firefox/Chrome 디버그 설정 포함)


개발환경 구성
-----------

### Backend

* [Poetry 설치](https://python-poetry.org/docs/#installation) 후 진행

```
poetry install
```

### Frontend

```
cd bigtree_app_frontend
npm install
```

실행
----

### Backend
```
poetry run python manage.py runserver
```

### Frontend
```
cd bigtree_app_frontend
npm run start
```

배포
----

.env 파일 생성(아래 내용은 없을시 기본값)

```
COMPOSE_PROJECT_NAME=bigtree_app
BIGTREE_APP_PORT=8080
```

```
docker-compose up --build
```


문서 빌드
--------

* 문서 내 UML 다이어그램 빌드를 위해서는 [PlantUML](https://plantuml.com)을 다운로드받아 경로를 지정해야 합니다.
  (환경변수 PLANTUML 또는 .env 파일에 지정)

아래 명령어를 실행하면 bigtree_app_document/build/ 폴더에 html 파일로 생성됨.

```
cd bigtree_app_document
npm install
poetry shell
make html
```

Visual Studio Code
------------------

* 브라우저 디버그 시 Frontend (NodeJS) 실행중인 상태에서 Launch Firefox/Launch Chrome 실행
* Firefox 디버그 시 브라우저 설정 변경 필요함(https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)