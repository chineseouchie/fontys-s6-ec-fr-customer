FROM cypress/base:16.14.0 as test-cypress
WORKDIR /app/cypress
COPY package*.json /app/cypress/
RUN npm install
COPY ./ /app/cypress/

FROM node:16-alpine as build-node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.6-alpine as deploy
COPY  /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
