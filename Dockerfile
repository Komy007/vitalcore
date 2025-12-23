# Stage 1: Build the React application
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (Debian has python/make/g++ or compatible)
RUN npm install

# Copy source code
COPY . .

# Build frontend (produces /app/dist)
RUN npm run build

# Stage 2: Production Server (Node.js)
FROM node:18-bullseye

WORKDIR /app

# Install build tools for native modules (required for better-sqlite3 build from source)
RUN apt-get update && apt-get install -y python3 make g++

# Install production dependencies only (backend) and force build from source
COPY package.json package-lock.json ./
RUN npm install --production --build-from-source

# Copy backend source code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Set ENV to production
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server/index.cjs"]
