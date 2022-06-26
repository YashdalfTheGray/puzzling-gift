FROM node:latest

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY .parcelrc tsconfig.json .env /app/
COPY src/ /app/src
RUN npm run build
