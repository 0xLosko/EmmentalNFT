# LAUNCH MONGO ON DOCKER

```shell
docker run -d --name Emmental-mongo \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
        -e MONGO_INITDB_ROOT_PASSWORD=secret \
        mongo
```

