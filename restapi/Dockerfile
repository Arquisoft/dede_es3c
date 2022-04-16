FROM node:16.13.1

LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es3c
# Crear directorio de trabajo
RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm install -g typescript ts-node

# RUN echo $(ls -1 ./src)

# RUN python src/data/data.py

#ARG PORT="5000"
#ENV RESTAPI_PORT=$PORT

#ARG WEBAPP_URI
#ENV REACT_WEBAPP_URI=$URI

# Copia la Aplicación
COPY ./package.json ./package.json

#Install the dependencies
RUN npm install --quiet

COPY . .

EXPOSE 3000

# Inicia la aplicación al iniciar al contenedor
CMD npm start

