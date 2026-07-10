FROM node:20.20.2 AS builder
WORKDIR /app

## install dependencies
COPY package.json package-lock.json ./
RUN npm ci

## add source code and configuration files
COPY tsconfig.json tsconfig.app.json tsconfig.spec.json angular.json ./
COPY src/ ./src

# build
RUN npm run build


FROM nginx:1.21.5-alpine

COPY --from=builder /app/dist/chsystem-frontend /usr/share/nginx/html
