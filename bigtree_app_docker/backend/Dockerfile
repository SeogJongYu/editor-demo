FROM python:3.8
ARG timezone=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${timezone} /etc/localtime
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml /app/pyproject.toml
COPY poetry.lock /app/poetry.lock
RUN poetry install
RUN poetry run pip install waitress hupper
COPY bigtree_app/ /app/bigtree_app
COPY bigtree_app_backend/ /app/bigtree_app_backend
COPY manage.py /app/manage.py
RUN poetry run python manage.py collectstatic
COPY . /app