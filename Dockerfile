# Dockerfile for backend
FROM python:3.9
ARG TZ=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime

RUN pip install poetry==1.1.12

WORKDIR /app
COPY pyproject.toml poetry.lock poetry-install.sh /app/

ARG GITHUB_CREDENTIAL
ARG GITHUB_PRIVATE_KEY
RUN /bin/bash /app/poetry-install.sh

COPY editor-demo/ /app/editor-demo
COPY editor-demo_backend/ /app/editor-demo_backend
COPY manage.py /app/manage.py
RUN poetry run python manage.py collectstatic
COPY . /app