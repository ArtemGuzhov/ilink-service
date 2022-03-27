FROM node:16-alpine 

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8008

CMD [ "npm", "start" ]
