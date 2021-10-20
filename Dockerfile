FROM node:14-slim

WORKDIR /app

ADD server/ /app

RUN npm install

CMD npm start