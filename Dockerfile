FROM node:24

WORKDIR /app

RUN chmod -R 777 /app
RUN chown -R www-data:www-data /app