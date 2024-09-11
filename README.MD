# Project Name

This project is a server application built on Express.js, implemented using the Singleton pattern and Inversion of Control (IoC) with Dependency Injection (DI), reminiscent of the NestJS framework. This setup ensures a modular and easily testable architecture.

## Description

This server application demonstrates how to build scalable and maintainable server-side applications using TypeScript and Express.js by employing design principles such as Singleton and Dependency Injection. This approach not only simplifies dependency management but also enhances the modularity of the application.

## Features

- **Singleton Pattern**: Ensures that a class has only one instance and provides a global point of access to it.
- **Dependency Injection**: Implements IoC to invert the control of object creation and binding of dependencies, making the application more modular and testable.
- **Modular Architecture**: The project is structured into modules, each responsible for a specific aspect of the application logic.
- **Validation Middleware**: Uses `class-validator` and `class-transformer` for request data validation, ensuring robust data handling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What you need to install the software:

```bash
node
npm


Installing
A step-by-step series of examples that tell you how to get a development environment running:

npm install
npm start
npm test



Using Docker for Setup
This project includes a docker-compose.yml file, which simplifies the setup process by containerizing the application and its dependencies. Follow these steps to use Docker to quickly get the application up and running.

Prerequisites
Ensure you have Docker and Docker Compose installed on your machine. If you do not have Docker installed, please follow the installation instructions on the official Docker website.

Running the Application with Docker
Clone the Repository: First, clone the repository to your local machine:

git clone https://github.com/Ashot2001/Task-Flow.git
cd Task-Flow


Start Docker Compose:

Execute the following command to start all services defined in the docker-compose.yml file. This command will build the application image and start all the services, including your application and any databases or other dependencies.


docker-compose up

Use the -d flag if you want to run it in detached mode:
docker-compose up -d


Accessing the Application:

Once the containers are running, you can access the application at http://localhost:PORT, where PORT is the port you have configured in your docker-compose.yml.

Stopping the Application:

To stop all services, use the following Docker Compose command:

docker-compose down

Testing with Postman
To test the application's API endpoints, you can use Postman. Make sure your Docker containers are running, and then send requests to http://localhost:PORT/api/endpoint, replacing PORT with the appropriate port number and endpoint with the actual API endpoint you wish to test. This allows you to interact with your application as if it were in a live production environment.

Deployment
Notes on how to deploy this on a live system.

Built With
Express.js - The web framework used
TypeScript - Typed superset of JavaScript
class-validator - For validation of request data
class-transformer - For transforming plain object to class instances
