# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy app source
COPY backend/ ./

# Build-time envs if needed
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "backend/app.js"]
