# Stage 1: Build the React application
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend (produces /app/dist)
RUN npm run build

# Stage 2: Production Server (Node.js)
FROM node:18-bullseye

WORKDIR /app

# Install production dependencies only (backend)
COPY package.json package-lock.json ./
RUN npm install --production

# Force rebuild of better-sqlite3 to ensure native binary compatibility
RUN npm rebuild better-sqlite3

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
