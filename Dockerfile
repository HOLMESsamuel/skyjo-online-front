#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/skyjo-online-front /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d