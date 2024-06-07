FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
