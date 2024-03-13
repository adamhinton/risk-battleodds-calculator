# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app/

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD npm start
