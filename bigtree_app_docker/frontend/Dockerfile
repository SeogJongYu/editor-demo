FROM node:14
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
COPY bigtree_app_frontend/package.json /app/package.json
COPY bigtree_app_frontend/yarn.lock /app/yarn.lock
WORKDIR /app
RUN mkdir -p /app/build/
RUN touch /app/build/index.html
ARG BIGTREE_APP_DOCKER_BACKEND_ONLY=false
RUN if [ "$BIGTREE_APP_DOCKER_BACKEND_ONLY" = "false" ]; then \
        yarn; \
    fi
COPY bigtree_app_frontend/ /app
RUN if [ "$BIGTREE_APP_DOCKER_BACKEND_ONLY" = "false" ]; then \
        yarn build:web; \
    fi
