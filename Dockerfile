# Stage 1: Build the React application
FROM node:18-alpine AS builder

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
FROM node:18-alpine

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

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Start the server
CMD ["node", "server/index.cjs"]
