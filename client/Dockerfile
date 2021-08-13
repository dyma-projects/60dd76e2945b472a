FROM node:alpine as node
### ANGULAR ###
WORKDIR /usr/src

COPY package*.json ./

RUN npm install

EXPOSE 4200 49153

COPY . .

CMD [ "npm", "start"]
