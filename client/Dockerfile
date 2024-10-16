FROM node:16 AS prod

WORKDIR /usr/src/client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm start"]