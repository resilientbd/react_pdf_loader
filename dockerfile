# Use the official Node.js image as the base image
FROM node:18.19 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller image to serve the built files
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

Expose port 80
#EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm","start"]
