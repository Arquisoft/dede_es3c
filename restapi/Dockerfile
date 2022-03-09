FROM node:lts-alpine

# Crear directorio de trabajo
RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm install -g typescript ts-node

# RUN echo $(ls -1 ./src)

# RUN python src/data/data.py

# Copia la Aplicación
COPY . .

RUN npm install --quiet

EXPOSE 3000

# Inicia la aplicación al iniciar al contenedor
CMD npm start

