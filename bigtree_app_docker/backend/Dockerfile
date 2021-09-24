FROM python:3.9
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml /app/pyproject.toml
COPY poetry.lock /app/poetry.lock
COPY bigtree_app_docker/backend/requirements.txt /tmp/requirements.txt
RUN poetry run pip install -r /tmp/requirements.txt
RUN poetry install --no-dev
COPY bigtree_app/ /app/bigtree_app
COPY bigtree_app_backend/ /app/bigtree_app_backend
COPY manage.py /app/manage.py
RUN poetry run python manage.py collectstatic
COPY . /app