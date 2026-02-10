# STAGE 1: Сборка
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build -- --configuration production

# STAGE 2: Запуск
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist/test-front /app/public

EXPOSE 3000

CMD ["serve", "-s", "public", "-l", "3000"]
