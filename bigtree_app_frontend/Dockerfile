FROM node:14 as builder

WORKDIR /app
RUN mkdir -p /app/build/
RUN touch /app/build/index.html

ARG TZ=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

ARG BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD
RUN if [ -z "APOV_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        yarn; \
    fi
COPY ./ /app
RUN if [ -z "APOV_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        yarn build:web; \
    fi

FROM node:14
COPY --from=builder /app/build /app/build