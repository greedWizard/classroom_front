FROM node:lts-alpine

WORKDIR /app

ADD . .

COPY package*.json ./

ADD src/ .
