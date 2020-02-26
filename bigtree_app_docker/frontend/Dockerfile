FROM node:13.6
ARG timezone=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${timezone} /etc/localtime
COPY bigtree_app_frontend/ /app
WORKDIR /app
RUN npm install
RUN npm run build
CMD cp -r /app/build/. /webroot
