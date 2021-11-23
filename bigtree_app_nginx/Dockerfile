FROM nginx:1.17.10
ARG BIGTREE_APP_TIMEZONE=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${BIGTREE_APP_TIMEZONE} /etc/localtime
COPY nginx.conf.template /etc/nginx/nginx.conf.template
CMD ["/bin/bash", "-c", "envsubst '$WSGI_HOST' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]