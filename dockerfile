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

# Stage 2: Install Java for the code compilation
FROM ubuntu:latest AS java_installer

# Install Java (OpenJDK) in the container
RUN apt-get update && \
    apt-get install -y default-jdk

# Stage 3: Final image with Node.js application and Java
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built Node.js application from the node_builder stage
COPY --from=node_builder /app .

# Copy Java from the java_installer stage
COPY --from=java_installer /usr/lib/jvm/java-11-openjdk-amd64 /usr/lib/jvm/java-11-openjdk-amd64

# Add Java to the PATH
ENV PATH="$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin"

# Expose any necessary ports
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:server"]
