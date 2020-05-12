FROM python:3.8
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
RUN pip install poetry==1.0.5
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