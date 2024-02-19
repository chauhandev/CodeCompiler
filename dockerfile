# Stage 1: Build the Node.js application
FROM node:latest AS node_builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the client
RUN npm run build

# Stage 2: Final image with Node.js application and Java
FROM ubuntu:latest

# Install Java (OpenJDK) in the container
RUN apt-get update && \
    apt-get install -y default-jdk

# Install Node.js and npm in the container
RUN apt-get install -y nodejs npm

# Set the working directory in the container
WORKDIR /app

# Copy the built Node.js application from the node_builder stage
COPY --from=node_builder /app .

# Add Java to the PATH
ENV PATH="$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin"

# Expose any necessary ports
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:server"]
