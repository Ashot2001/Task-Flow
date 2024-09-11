# Stage 1: Build the application
FROM node:alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig.json .
RUN npm install

# Copy the entire project, including the prisma directory and .env file
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Setup the production environment
FROM node:alpine as production

WORKDIR /usr/src/app

# Copy the built files, production dependencies, and .env file
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/.env ./.env  
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "/usr/src/app/dist/src/main.js"]
