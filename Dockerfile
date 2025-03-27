# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including ts-node)
RUN npm install
RUN npm install -g ts-node

# Install LocalTunnel globally
RUN npm install -g localtunnel

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application and LocalTunnel together
CMD ["sh", "-c", "npx ts-node src/server.ts & lt --port 3000"]
