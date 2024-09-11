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


Deployment
Notes on how to deploy this on a live system.

Built With
Express.js - The web framework used
TypeScript - Typed superset of JavaScript
class-validator - For validation of request data
class-transformer - For transforming plain object to class instances




