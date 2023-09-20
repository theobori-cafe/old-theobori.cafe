# ☕ theobori.cafe

## ℹ️ About

Personal website + archives / blog

## 📖 How to build and run ?

1. Get a node environment
2. Install `npm` or `yarn`
3. Install the dependencies with `npm i` or `yarn`
4. Run as
    - Development: `npm run dev`
    - Production: `npm run build && npm run start`

## 🐳 Docker

```bash
docker build -t website .
docker run -it -p 3000:3000 website
```

## 📜 Scripts

In `scripts` are some useful scripts like `convert.py` that convert markdown text for other documents format (Gemini, Gopher).

## 📡 Other protocols

The `Gemtext` version for `Gemini` has been test with the [lagrange](https://github.com/skyjake/lagrange) client.  For `Gopher` it works well with the [phfetch](https://github.com/xvxx/phetch) client.
