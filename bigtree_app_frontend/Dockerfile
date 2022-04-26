FROM node:16 as builder

WORKDIR /app
RUN mkdir -p /app/build/
RUN touch /app/build/index.html

ARG TZ=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
COPY ./package.json ./package-lock.json /app/

ARG BIGTREE_APP_DOCKER_DISABLE_FRONTEND_BUILD
RUN if [ -z "APOV_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        npm install; \
    fi
COPY ./ /app
RUN if [ -z "APOV_DOCKER_DISABLE_FRONTEND_BUILD" ]; then \
        npm run build:web; \
    fi

FROM node:16
COPY --from=builder /app/build /app/build