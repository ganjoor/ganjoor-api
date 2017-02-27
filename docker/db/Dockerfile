FROM mysql:5.7

ADD dump.sql /docker-entrypoint-initdb.d
ADD startup /etc/mysql/startup

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=ganjoor
ARG MYSQL_ROOT_PASSWORD=root

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/startup

CMD ["mysqld", "--init-file=/etc/mysql/startup"]

EXPOSE 3306
