# Stage 1: Build Frontend
FROM node:18-bullseye AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Server
FROM node:18-bullseye
WORKDIR /app
COPY package.json package-lock.json ./
# Clean install, no native builds
RUN npm install --production
COPY server ./server
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server/index.cjs"]
