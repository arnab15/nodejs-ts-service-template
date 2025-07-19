# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built JS files and docs
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/docs ./dist/docs

# If you have other runtime files like .env or config.json, copy them here
# COPY .env ./

# Start the app
CMD ["npm", "start"]
