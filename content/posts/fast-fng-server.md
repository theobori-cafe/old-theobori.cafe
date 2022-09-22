---
title: Teeworlds FNG server
description: Fast deployment of a teeworlds fng server using Docker
updatedAt: "2022-09-23"
categories: [
  "Teeworlds",
  "Docker",
  "Server"
]
author: "Théo Bori"
---

# Introduction

![DDNet Logo](/ddnet_logo.png)

I've been playing **Teeworlds / DDnet** since at least 2014 and my favorite mode to ever play was FNG. I wanted to be able to create a server quickly if needed, so I made a Docker image and some Python that deploys a server in one command line.

# Docker image

```docker
FROM alpine:latest

# Working/server directory name
ENV DIRNAME fng2

# Install dependencies to build binaries
RUN apk update && \
	apk --update add --no-cache --virtual .build-dependencies git cmake make gcc g++ alpine-sdk \
	sdl2 sdl2-dev python3 \
    freeglut freeglut-dev glew-dev glm-dev && \
    ln -sf python3 /usr/bin/python && \
	apk --update --no-cache add build-base && \
    git clone https://github.com/Jupeyy/teeworlds-fng2-mod.git --branch fng_06 $DIRNAME && \
    cd $DIRNAME && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make -j16 && \
    cp -r * .. && cd ..

WORKDIR $DIRNAME

ENTRYPOINT [ "sh", "start.sh" ]
```

# Deployment

The server is compatible with **0.6** and **0.7** Teeworlds version.
By default, it uses **`fng.cfg`** as configuration file.

The **UDP** port opened on the container will be the value of sv_port in this file.

*[Source](https://github.com/theobori/teeworlds-fng2-docker)*

For help
```
python3 run.py -h
```

1. If you never build, run:
```
python3 run.py build image_name
```
1. Else you can directly execute the script with **`run`** as action
```
python3 run.py run image_name
```

# Conclusion
It is now very simple to deploy a Teeworlds FNG server.
