FROM node:latest

COPY . /var/www/html

RUN cd /var/www/html && npm install

RUN chmod +x /var/www/html/docker-entrypoint.sh
ENTRYPOINT ["/var/www/html/docker-entrypoint.sh"]