FROM nginx:1.17.10
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
COPY bigtree_app_docker/webserver/nginx.conf /etc/nginx/nginx.conf