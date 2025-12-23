# Clean Build for Toxic Dependency Check
FROM node:18-bullseye

WORKDIR /app

# Copy pure package.json
COPY package.json ./

# Install ONLY express (since that's all that's left)
# Use npm install, ignoring lockfile by not copying it
RUN npm install

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server/index.cjs"]
