FROM node:lts-alpine as build-stage

WORKDIR /projects/github/kafedra-front
COPY . .
RUN npm install \
  && npm run build \
  && rm -rf node_modules

FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /projects/github/kafedra-front/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Сборка образа
# sudo docker build -t kafedra-front .

# Запуск образа
# sudo docker run -p 3000:80 kafedra-front
