FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY . .

EXPOSE 8081

RUN npm install mysql2
RUN npm install dotenv
RUN npm install unique-names-generator
RUN npm i