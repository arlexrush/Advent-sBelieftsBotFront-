#docker build -t arlexrush/pdfconverterfront:1.0 .
#docker run -p 3000:80 pdfconverterfront
#docker exec -it quirky_kowalevski sh


# Usamos una imagen base de Node.js 16.17.1 para construir la aplicación
FROM node:16.17.1 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias con --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# Usamos una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos construidos desde el paso anterior
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 3000
EXPOSE 3000

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
