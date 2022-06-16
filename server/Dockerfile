FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY server.js /app/.
COPY yarn.lock ./

ADD db /app/db
ADD controllers /app/controllers
ADD models /app/models
ADD routes /app/routes
ADD .env /app/.env

RUN yarn install --production

EXPOSE 5001

CMD node server.js