FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs
COPY . .
ENV JWT_SECRET="aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K"
ENV KAFKA_TOPIC="notification"
EXPOSE 3000
CMD [ "npm", "start" ]