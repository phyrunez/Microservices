# Microservices

This project is the source code of the Udemy course [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/).
Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes.

**Project content**:

* Blog (async communication(monolith) -> {query service + event-bus}, moderation, Docker)
* ...

## Some sources and external libraries used:

* [Bootstrap](https://getbootstrap.com/)
* [dockerhub: Node.js](https://hub.docker.com/_/node)
* [...](....)


## Optional sources and tools used:  

* [Postman](https://www.postman.com)
* [...](....)

## Important terminology

* **Kubernetes cluster**: a collection of nodes + a master to manage them
* **Node**: a virtual machine that will run our containers
* **Pod**: more or less a running container. Technically, a pod can run multiple containers
* **Deployment**: monitors a set of pods, make sure they are running and restarts them if they crash
* **Service**: provides an easy-to-remember URL to access a running container, including types:
    * Cluster IP: sets up an easy-to-remember URL to access a pod. Only exposes pods **in the cluster**
    * Node Port: makes a pod accessible from **outside the cluster**. Usually only used for dev purposes
    * Load Balancer: makes a pod accessible from **outside the cluster**, right way to expose a pod to the outside world, need an **Ingress(Ingress Controller)**, a pod with a set of routing rules to distribute traffic to other services.
    * External Name: redirects an in-cluster request to a CNAME url.

<div style="text-align:center">
<img src="https://github.com/victorchennn/Microservices/blob/master/diagram.png" width="300" height="300">
</div>

## Docker Commands

Some essential docker commands:

* `docker run {image name}` -> create and run a docker from an image
* `docker run {image name} {command}` -> default command override
* `docker run -it {image name} {command}` -> Keep STDIN open even if not attached
* `docker run -p {localhost port}:{port inside the container} {image name}` -> run with port mapping
* `docker build .` -> build an image
* `docker build -t {Docker Id/project name:version} .` -> tag an image
* `docker ps` -> list the running container
* `docker ps --all` -> list all running containers
* `docker create {image name}` -> create a container in an image
* `docker start {container id}` -> start a container
* `docker start -a {container id}` -> start a container with output info
* `docker system prune` -> remove all
    - stopped containers
    - networks not used by at least one container
    - dangling images
    - dangling build cache
* `docker logs {container id}` -> get logs from a container
* `docker stop {container id}` -> stop(takes some time < 10s or kill) a container
* `docker kill {container id}` -> kill(instantaneously) a container
* `docker exec -it {container id} {command}` -> execute an additional command in a container
* `docker push {Docker Id/project name}` -> push the image to docker hub

See more commands on [Docker command-line reference](https://docs.docker.com/engine/reference/commandline/docker/)

## Kubernetes(K8s) Commands

In general Docker is about running **individual** containers, kubernetes is about running **a bunch of** containers together.

Some essential **Pod** commands:

* `kubectl apply -f {config file name.yaml}` -> create a pod out of a config file
* `kubectl get pods` -> list all the running pods
* `kubectl exec -it {pod name} {command}` -> execute the given command in a running pod
* `kubectl logs {pod name}` -> print out logs from the given pod
* `kubectl delete pod {pod name}` -> deletes the given pod
* `kubectl describe pod {pod name}` -> print out some info about a specific pod

**Deployment** commands:

* `kubectl apply -f {config file name.yaml}` -> create a deployment out of a config file
* `kubectl get deployments` -> list all the running deployments
* `kubectl delete deployment {deployment name}` -> deletes the given deployment
* `kubectl describe deployment {deployment name}` -> print out some info about a specific deployment
* `kubectl rollout restart deployment {deployment name}` -> restart the given deployment

> Note: When updating the image used by a deployment, need to run:
>
>```bash
>$ docker push {Docker Id/project name}
>$ kubectl rollout restart deployment {deployment name}
>```
>
> And make sure the deployment must be using the *`latest`* tag in the pod spec section.

**Service** commands:
* `kubectl get services` -> list all the running services
* `kubectl describe service {service name}` -> print out some info about a specific service
