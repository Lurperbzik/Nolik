# Etapa 1: Compilación
FROM node:24-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run tsc

FROM node:24-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/.env ./


RUN npm install --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build/index.js"]
