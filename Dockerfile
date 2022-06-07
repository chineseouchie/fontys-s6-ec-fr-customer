FROM node:16-alpine as build-node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

FROM cypress/base:16.14.0 as test-cypress
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/


FROM nginx:1.21.6-alpine as deploy
RUN npm run build
COPY  /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
