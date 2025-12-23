# Single Stage Simple Build
FROM node:18-bullseye

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies (though we don't strictly need them for the http server, we keep it for valid node env)
RUN npm install

# Env vars
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start server
CMD ["node", "server/index.cjs"]
