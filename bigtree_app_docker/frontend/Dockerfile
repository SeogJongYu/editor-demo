FROM node:14.2
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
COPY bigtree_app_frontend/package.json /app/package.json
COPY bigtree_app_frontend/package-lock.json /app/package-lock.json
WORKDIR /app
RUN mkdir -p /app/build/
RUN touch /app/build/index.html
ARG BIGTREE_APP_DOCKER_BACKEND_ONLY=false
RUN if [ "$BIGTREE_APP_DOCKER_BACKEND_ONLY" = "false" ]; then \
        npm install; \
    fi
COPY bigtree_app_frontend/ /app
RUN if [ "$BIGTREE_APP_DOCKER_BACKEND_ONLY" = "false" ]; then \
        npm run build-web; \
    fi
