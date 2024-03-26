#!/bin/bash

container_name=mysql-invadmin

docker run --name $container_name -e MYSQL_ROOT_PASSWORD=123123 -p 3306:3306 -d mysql
echo "Starting $container_name..."
sleep 20
echo "Container started. Creating database..."
docker exec -i $container_name mysql -uroot -p123123 < ./db.sql
echo "Done!"