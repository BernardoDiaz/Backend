# Usa una imagen base de Node.js (puedes cambiarla según tus necesidades)
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que escucha tu aplicación (ajústalo según tus necesidades)
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
