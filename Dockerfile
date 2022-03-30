FROM node:17 as build-node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.6
COPY --from=build-node /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
RUN apk update  
RUN apk upgrade 
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
