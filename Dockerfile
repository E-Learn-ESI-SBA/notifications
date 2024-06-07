FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build:ts
EXPOSE 3000

CMD [ "yarn","fastify","start", "-l" ,"info" ,"dist/app.js" ]
