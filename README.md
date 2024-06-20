# MERN Backend with TypeScript

This repository contains the backend code for a MERN stack application using TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name


Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:

plaintext
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret-key
Running the Application
To start the development server, run:

bash
Copy code
npm run dev
# or
yarn dev
This will start the server using ts-node-dev for hot-reloading.
