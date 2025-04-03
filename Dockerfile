# Step 1: Use the official Node.js image with version 22
FROM node:22

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the port the app will run on (e.g., 3000)
EXPOSE 3000

# Step 7: Define the command to run the app
CMD ["npm", "start"]
