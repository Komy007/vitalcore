# Safe Single-Stage Build for Cloud Run
FROM node:18-bullseye

WORKDIR /app

# 1. Install System Build Tools (Required for better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++

# 2. Copy Package Files
# We do NOT trust the local package-lock (Windows)
COPY package.json ./

# 3. Clean Install (Generates fresh package-lock for Linux)
RUN npm install --build-from-source=better-sqlite3

# 4. Copy Source Code
COPY . .

# 5. Build Frontend (React)
RUN npm run build

# 6. Rebuild Native Modules (Double check)
RUN npm rebuild better-sqlite3

# 7. Configure Runtime
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# 8. Start Monolithic Server
CMD ["node", "server/index.cjs"]
