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

# Install production dependencies only (backend)
COPY package.json package-lock.json ./
RUN npm install --production

# Force rebuild of better-sqlite3 to ensure native binary compatibility in Debian
RUN npm rebuild better-sqlite3

# Copy backend source code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Set ENV to production
ENV NODE_ENV=production

# Expose port 8080 checks (Cloud Run contract)
EXPOSE 8080

# Start the server (Monolithic: Express serves API + Frontend)
# Explicitly use node to bypass any npm script wrapping issues
CMD ["node", "server/index.cjs"]
