# Use lightweight official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source files
COPY . .

# Expose default backend port
EXPOSE 5000

# Set environment production flag
ENV NODE_ENV=production

# Start REST server
CMD ["node", "server.js"]
