#!/bin/bash

container_name=mysql-invadmin
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo $script_dir

docker run --name $container_name -e MYSQL_ROOT_PASSWORD=123123 -p 3306:3306 -d mysql
echo "Starting $container_name..."
sleep 20
echo "Container started. Creating database..."
sudo docker exec -i $container_name mysql -uroot -p123123 < "$script_dir/db.sql"
echo "Done!"