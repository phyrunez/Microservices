# Microservices

This project is the source code of the Udemy course [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/).
Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes.

### Project content:

* Blog (async communication(monolith) -> {query service + event-bus}, moderation, Docker)
* ...

### Some sources and external libraries used:
* [Bootstrap](https://getbootstrap.com/)
* [dockerhub: Node.js](https://hub.docker.com/_/node)
* [...](....)

-----------------
### Optional sources and tools used:  
* [Postman](https://www.postman.com)
* [...](....)

### Docker Commands

Some essential docker commands:

* `docker run {image name}` -> **create** and **run** a docker from an image
* `docker run {image name} {command}` -> default command **override**
* `docker run -it {image name} {command}` -> Keep **STDIN** open even if not **attached**
* `docker run -p {localhost port}:{port inside the container} {image name}` -> run with **port mapping**
* `docker build .` -> **build** an image
* `docker build -t {Docker Id/project name:version} .` -> **tag** an image


* `docker ps` -> **list** the running container
* `docker ps --all` -> **list all** running containers
* `docker create {image name}` -> **create** a container in an image
* `docker start {container id}` -> **start** a container
* `docker start -a {container id}` -> **start** a container with **output info**
* `docker system prune` -> **remove all**
    - stopped containers
    - networks not used by at least one container
    - dangling images
    - dangling build cache


* `docker logs {container id}` -> **get logs** from a container
* `docker stop {container id}` -> **stop**(takes some time < 10s or kill) a container
* `docker kill {container id}` -> **kill**(instantaneously) a container
* `docker exec -it {container id} {command}` -> execute an **additional command** in a running container

See more commands on [Docker command-line reference](https://docs.docker.com/engine/reference/commandline/docker/)
