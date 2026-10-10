FROM node:24-slim AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .

RUN npx tsc -p tsconfig.json


FROM node:24-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/.env ./

RUN npm ci --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build/index.js"]
