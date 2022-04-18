FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es3c
WORKDIR /app
COPY ./package.json ./package.json

#Install the dependencies
RUN npm install --quiet

COPY . .

ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

#Create an optimized version of the webapp
RUN npm run build 

#Ver como podemos llamar npm run prod aquí
CMD  npm run prod
