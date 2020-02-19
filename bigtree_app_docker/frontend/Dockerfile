FROM node:13.6
COPY bigtree_app_frontend/ /app
WORKDIR /app
RUN npm install
RUN npm run build
CMD cp -r /app/build/. /webroot
