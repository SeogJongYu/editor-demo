FROM node:14
ARG TZ=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
WORKDIR /app
RUN mkdir -p /app/build/
RUN touch /app/build/index.html
ARG BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD
RUN if [ -z "$BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        yarn; \
    fi
COPY ./ /app
RUN if [ -z "$BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        yarn build:web; \
    fi
