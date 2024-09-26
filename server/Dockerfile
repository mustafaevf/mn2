FROM node:14 AS Prod

ENV NODE_ENV=Prod

WORKDIR /usr/src/server

COPY package.json .
# COPY package-lock.json .

RUN npm install

COPY . .


EXPOSE 8080
# RUN npm start

CMD ["sh", "-c", "npm start"]