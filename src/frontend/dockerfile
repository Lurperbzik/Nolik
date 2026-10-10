FROM node:24-slim AS builder

WORKDIR /frontend

COPY package*.json ./
COPY .env .env
RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /frontend/dist ./dist
COPY --from=builder /frontend/package*.json ./

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
