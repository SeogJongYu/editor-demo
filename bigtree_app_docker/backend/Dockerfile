FROM python:3.8
RUN pip install pipenv
WORKDIR /app
COPY Pipfile /app/Pipfile
COPY Pipfile.lock /app/Pipfile.lock
RUN pipenv install
RUN pipenv run pip install waitress
COPY bigtree_app/ /app/bigtree_app
COPY bigtree_app_backend/ /app/bigtree_app_backend
COPY manage.py /app/manage.py
RUN pipenv run python manage.py collectstatic
COPY . /app