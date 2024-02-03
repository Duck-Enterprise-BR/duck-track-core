FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run start:build

EXPOSE 3000

ENV PORT=3000

CMD ["node", "dist/main.js"]