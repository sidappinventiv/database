FROM node:18.16.0-alpine

WORKDIR /advertise_manage

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=3000
#    //CODE BINDING IS DONE USING EXPOS
EXPOSE 3000

CMD [ "npm","start" ]
