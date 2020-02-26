FROM nginx:1.17.7
ARG timezone=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${timezone} /etc/localtime
COPY bigtree_app_docker/webserver/nginx.conf /etc/nginx/nginx.conf