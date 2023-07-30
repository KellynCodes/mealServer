# Specify a base image
FROM node:18

# A directory within the virtualized Docker environment
WORKDIR /usr/src/app

# Copies package.json and yarn.lock to Docker environment
COPY package.json yarn.lock ./

# Install all node packages
RUN yarn install

# Copy everything over to Docker environment
COPY . .

# Typescript compiler
RUN yarn build

# Expose the port
EXPOSE 8000

# Default command
CMD ["node", "dist/main.js"]
