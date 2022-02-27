# Adem KOÇ - Case Study

## Requirements

- Node.js version 16
- Docker

## Getting Started

To start database container please use following command

```sh
chmod +x start.sh
./start.sh
```

If it's not work use you can try this way.

First you have to change database host from docker container to localhost. Then execute following commands.

```sh
docker run --name book-library-database \
    -e MYSQL_DATABASE=book-lib \
    -e MYSQL_USER=z5aqhspgnqim \
    -e MYSQL_PASSWORD=YKphIYQka0CFZIbOFZrfgPQ8QTcL6fAIH33WxPwjoI \
    -e MYSQL_RANDOM_ROOT_PASSWORD=yes \
    -p 3306:3306 \
    -d mysql:8.0.28
```

```sh
npm i
```

```sh
npm run-script knex:migrate:latest
```

```sh
npm run start
```
