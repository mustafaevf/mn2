FROM node:16 AS prod

WORKDIR /usr/src/client

COPY package.json .
# COPY package-lock.json .

RUN npm install

COPY . .

# RUN 
EXPOSE 3000 3000

CMD ["sh", "-c", "npm start"]