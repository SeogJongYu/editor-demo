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


의존성 설치
-----------

### Backend

```
pip install pipenv  # pipenv가 설치되어 있지 않은 경우
pipenv install
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
python manage.py runserver
```

### Frontend
```
cd bigtree_app_frontend
npm run start
```

Visual Studio Code
------------------

* 브라우저 디버그 시 Frontend (NodeJS) 실행중인 상태에서 Launch Firefox/Launch Chrome 실행
* Firefox 디버그 시 브라우저 설정 변경 필요함(https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)