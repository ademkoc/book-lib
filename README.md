# Case Study

## Requirements

- Node.js version 16
- Docker

To start database container please use following command

```sh
docker run --name book-library-database \
    -e MYSQL_DATABASE=book-lib \
    -e MYSQL_USER=z5aqhspgnqim \
    -e MYSQL_PASSWORD=YKphIYQka0CFZIbOFZrfgPQ8QTcL6fAIH33WxPwjoI \
    -e MYSQL_RANDOM_ROOT_PASSWORD=yes \
    -p 3306:3306 \
    -d mysql:8.0.28
```
