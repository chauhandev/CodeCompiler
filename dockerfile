FROM openjdk:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy your Node.js application files
COPY . .

# Build the client
RUN npm install && npm run build

# Expose any necessary ports
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:server"]
