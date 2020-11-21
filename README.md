# http-streaming-try-backend

The backend of a HTTP real-time streaming demo

## How to run

### Install Docker and Docker Compose

Please follow the official documentation and install Docker & Docker Compose on your own system.
[Docker Official Installation Documentation](https://docs.docker.com/engine/install/)  
[Docker Compose Official Installation Documentation](https://docs.docker.com/compose/install/)

### Copy the compiled production code

Please copy the compiled [front-end project](https://github.com/MartinMa28/http-streaming-try-frontend) to the root directory.

### Run the containers

Force build:

```
docker-compose --compatibility up --build
```

Don't rebuild:

```
docker-compose --compatibility up
```

### Set up MongoDB replica set

Get into mongo-1 container

```
docker exec -it http-streaming-try-backend_mongo-1_1 mongo
```

Initiate the replica set in mongo shell

```
rs.initiate()
```

Get out of mongo-1, then enter mongo-2

```
docker exec -it http-streaming-try-backend_mongo-2_1 mongo
```

Add mongo-2 to the replica set

```
rs.add('mongo-2')
```

Get out of mongo-2, then enter mongo-3

```
docker exec -it http-streaming-try-backend_mongo-2_1 mongo
```

Set mongo-3 as an arbiter

```
addArb('mongo-3')
```

You are all set.
