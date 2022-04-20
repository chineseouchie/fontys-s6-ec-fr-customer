FROM node:16-alpine as build-node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build-node /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
