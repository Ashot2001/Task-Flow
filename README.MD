# Project Name

This project is a server application built on Express.js, implemented using the Singleton pattern and Inversion of Control (IoC) with Dependency Injection (DI), reminiscent of the NestJS framework. This setup ensures a modular and easily testable architecture.

## Description

This server application demonstrates how to build scalable and maintainable server-side applications using TypeScript and Express.js by employing design principles such as Singleton and Dependency Injection. This approach not only simplifies dependency management but also enhances the modularity of the application.

## Features

- **Singleton Pattern**: Ensures that a class has only one instance and provides a global point of access to it.
- **Dependency Injection**: Implements IoC to invert the control of object creation and binding of dependencies, making the application more modular and testable.
- **Modular Architecture**: The project is structured into modules, each responsible for a specific aspect of the application logic.
- **Validation Middleware**: Uses `class-validator` and `class-transformer` for request data validation, ensuring robust data handling.

## Configuration

### Environment Setup

Before running the application, you need to set up necessary environment variables. Create a `.env` file in the root directory of the project and add the following:

```plaintext
# Environment Configuration
PORT=3000

# Database connection
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"


Replace the database URL with your actual database credentials. This .env file should not be committed to your version control system (ensure it's listed in your .gitignore).

Getting Started
Follow these instructions to set up the development environment and run the application locally.

Prerequisites
Node.js and npm installed on your machine.
Installation
A step-by-step guide on how to get a development environment running:

Install Dependencies:
npm install

Database Initialization:
npm run db:init
npx prisma migrate deploy
npx prisma db seed

Start the Application:
npm start

Run Tests:
npm test


Using Docker for Setup
This project includes a docker-compose.yml file, which simplifies the setup process by containerizing the application and its dependencies.

Docker Prerequisites
Ensure you have Docker and Docker Compose installed on your machine. If not, please follow the installation instructions on the official Docker website.

Running with Docker
Clone the Repository:
git clone https://github.com/Ashot2001/Task-Flow.git
cd Task-Flow

docker-compose up
# Use the -d flag for detached mode

docker-compose run --rm app sh
npm i 
npm test

Once the containers are running, you can access the application at http://localhost:PORT

Stopping the Application:
docker-compose down

Testing with Postman
To test the application's API endpoints, ensure your Docker containers are running, then send requests to http://localhost:PORT/api/endpoint.

## API Testing with Postman

We have provided a Postman collection that includes pre-configured requests for all the API endpoints. This makes it easy to test and interact with the API right away.

### How to Use the Postman Collection

1. **Download Postman**: If you haven't already, download and install Postman from [the official website](https://www.postman.com/downloads/).

2. **Import the Collection**:
   - Download the Postman collection JSON file from the repository (or follow the link provided in the repository if the file is hosted online).
   - Open Postman and import the collection by clicking `File` > `Import` > `Choose Files` and select the downloaded JSON file.

3. **Configure Environment Variables**:
   - In Postman, you may need to set up environment variables such as `base_url`. You can do this in the Manage Environments section of Postman.
   - Example variables include:
     - `base_url`: Set this to the root URL of your API (e.g., `http://localhost:3000`).

4. **Send Requests**:
   - After importing the collection and setting up your environment, you can start sending requests to test different functionalities of the API.
   - Make sure the API server is running and accessible.

### Benefits of Using Our Postman Collection

- **Efficiency**: Quickly test all API endpoints without manually setting up each request.
- **Accuracy**: Ensures that you are sending requests with the correct parameters and in the proper format.
- **Convenience**: Provides a ready-made suite of API calls that can be used for both initial testing and regression tests.





#Built With
Express.js - The web framework used
TypeScript - Typed superset of JavaScript
class-validator - For validation of request data
class-transformer - For transforming plain object to class instances

