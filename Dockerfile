FROM node:18-alpine AS angular

workdir /app

COPY . .
COPY package*.json ./
Run npm install
RUN npm install -g @angular/cli
run ng build

FROM nginx:alpine

COPY --from=angular /app/dist/pharmanage /usr/share/nginx/html

expose 80

CMD ["nginx", "-g", "daemon off;"]