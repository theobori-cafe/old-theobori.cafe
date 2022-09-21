# website

## About

Personal website + blog

## How to build and run ?

1. Get a node environment
2. Install `npm` or `yarn`
3. Install the dependencies with `npm i` or `yarn`
4. Run as
    - Development: `npm run dev`
    - Production: `npm run build && npm run start`

## Docker

```bash
docker build -t website .
docker run -it -p 3000:3000 website
```
