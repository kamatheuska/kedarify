FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=8080

RUN npm ci --only=production

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]
