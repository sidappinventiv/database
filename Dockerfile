FROM node:18.16.0-alpine

WORKDIR /advertise_manage

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=3500
#    //CODE BINDING IS DONE USING
EXPOSE 3500
 
CMD [ "npm","start"]

