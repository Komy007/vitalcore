# Stage 1: Build the React application
# Use specific version of node:18 (Debian-based) for stability
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (Debian image usually has python/make/g++ pre-installed or available)
# Using npm install is safe here
RUN npm install

# Copy source code
COPY . .

# Build frontend (produces /app/dist)
RUN npm run build

# Stage 2: Production Server (Node.js)
FROM node:18

WORKDIR /app

# Install production dependencies only (backend)
COPY package.json package-lock.json ./
RUN npm install --production

# Copy backend source code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Set ENV to production
ENV NODE_ENV=production

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server/index.cjs"]
