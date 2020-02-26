FROM node:13.6
ARG timezone=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/${timezone} /etc/localtime
COPY bigtree_app_frontend/package.json /app/package.json
COPY bigtree_app_frontend/package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install
COPY bigtree_app_frontend/ /app
RUN npm run build
CMD cp -r /app/build/. /webroot
