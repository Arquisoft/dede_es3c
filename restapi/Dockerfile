FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es3c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
CMD [ "npm", "start" ]