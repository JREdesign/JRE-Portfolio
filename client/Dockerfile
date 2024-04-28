# syntax=docker/dockerfile:1

# Base stage with Node.js
FROM node:21.5.0-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Dependencies stage for installing all dependencies
FROM base as deps

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies using legacy peer dependencies to avoid conflicts
RUN npm ci --legacy-peer-deps

# Build stage for compiling the application
FROM deps as build

# Copy all source files into the image
COPY . .

# Build the application using Vite
RUN npm run build

# Final stage to run the application with minimal runtime dependencies
FROM base as final

# Set the environment to production
ENV NODE_ENV=production

# Copy the package.json for any potential runtime use
COPY package.json ./

# Copy production node_modules from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the build output directory from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port 5173 for the application
EXPOSE 5173

# Use a non-root user to run the application for security purposes
USER node

# Command to serve the application using 'serve'
CMD ["serve", "-s", "dist", "-l", "5173"]
