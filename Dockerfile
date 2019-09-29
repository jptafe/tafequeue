FROM php:7.2-apache

COPY dist/ /var/www/html/
COPY srv/ /var/www/html/srv/
#RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl mariadb-client 
RUN docker-php-ext-install pdo_mysql opcache mbstring
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#RUN composer install
#RUN mysql -h 127.0.0.1 -P 3306 -u devuser -p'devpass' sqs < srv/sql/sqs.sql

EXPOSE 80
