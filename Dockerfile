FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

ENV PORT ${PORT}

EXPOSE ${PORT}

RUN npm run build