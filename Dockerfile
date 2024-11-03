# Usa una imagen base ligera
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias
COPY package*.json ./

# Instala dependencias de producción
RUN npm install --only=production

# Copia el resto del código
COPY . .

# Excluye los archivos innecesarios con .dockerignore

# Exponer el puerto
EXPOSE 8080

# Comando por defecto
CMD ["npm", "start"]
