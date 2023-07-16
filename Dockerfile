# Etapa de compilación
FROM node:18-alpine AS builder

WORKDIR /app

ARG PUBLIC_URL

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

# Etapa de ejecución
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/legacyData ./legacyData
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
