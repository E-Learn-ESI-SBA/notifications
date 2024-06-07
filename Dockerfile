FROM node:21.7.3-alpine3.20
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml app/
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD [ "pnpm", "start" ]