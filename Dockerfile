# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install LocalTunnel globally
RUN npm install -g localtunnel

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application and LocalTunnel together
CMD ["sh", "-c", "npm start & lt --port 3000"]
