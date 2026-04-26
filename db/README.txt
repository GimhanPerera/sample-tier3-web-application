install docker in Ubuntu,


docker run -d --name postgres-fruit -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=fruitdb -p 5432:5432 postgres

docker exec -i postgres-fruit psql -U admin -d fruitdb < ./init.sql