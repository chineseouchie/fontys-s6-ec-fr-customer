FROM node:16-alpine as build-node
WORKDIR /app
COPY package*.json /app/
RUN npm install

# FROM build-node as test-cypress
# RUN npm run test:ci

# FROM build-node as deploy
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=deploy /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
