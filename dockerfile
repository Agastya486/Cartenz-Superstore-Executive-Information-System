FROM php:8.2-apache

RUN docker-php-ext-install pdo_mysql

COPY . /var/www/html/

EXPOSE 10000

CMD ["/bin/sh", "-c", "echo \"Listen ${PORT:-10000}\" > /etc/apache2/ports.conf && exec apache2-foreground"]