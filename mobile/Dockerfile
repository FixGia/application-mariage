# Utilise l'image officielle de Flutter
FROM cirrusci/flutter:stable-web AS build
WORKDIR /app
COPY . .
RUN flutter build web

# Utilise NGINX pour servir le build web
FROM nginx:alpine
COPY --from=build /app/build/web /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
