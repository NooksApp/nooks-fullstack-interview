#!/bin/zsh

# This file starts the server inside a Docker container. Not necessary for local development

# Build the Docker image from the Dockerfile
docker build -t takehome .

# Start a new Docker container from the image and map port 50051 to port 50051 on the host machine
docker run -p 8080:8080 -d --name takehome-container takehome

# Attach to the container logs
docker logs -f takehome-container &

# Cleanup after the container is stopped
cleanup() {
    docker kill takehome-container &> /dev/null
    docker rm takehome-container &> /dev/null
}
trap "cleanup" INT

# Wait for the container to finish running
docker wait takehome-container

# Remove the container
cleanup