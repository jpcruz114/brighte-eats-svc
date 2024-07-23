# Brighte Eats API

## Description

Brighte Eats API is a system to accept expressions of interest for a new product and to view those leads in a dashboard. The new product is called Brighte Eats, and it allows customers to express interest in services such as delivery, pick-up, and payment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Running Migrations](#running-migrations)
- [Running Tests](#running-tests)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) (version 6.x or later)
- [PostgreSQL](https://www.postgresql.org/download/) (version 12.x or later)
- [DBeaver](https://dbeaver.io/download/) (optional, for database management)
    - Note: You can use other RDBMS application based on your preferences

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jpcruz114/brighte-eats-svc
   cd brighte-eats-svc

2. **Install dependencies:**
    ```bash
    npm install

## Database Setup
1. **Start PostgreSQL:**
    Ensure your PostgreSQL server is running. You can start the PostgreSQL service via your system's service manager or using the command line.

2. **Create the database and user:**
    Open your terminal and run the following commands in the psql shell:

    ```bash
    psql -U postgres

    Inside the `psql` shell, run:
    ```bash
    CREATE DATABASE brighte_eats;
    CREATE USER 'your_username' WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE brighte_eats TO 'your_username';

3. **Configure PostgreSQL to accept connections:**
    Ensure PostgreSQL is configured to accept local connections. Edit the postgresql.conf and pg_hba.conf files if necessary.

## Environment Variables
    Create a .env file in the root directory of your project and add the following environment variables:

    DB_NAME=brighte_eats
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=5432
    NODE_ENV=development
    PORT=3000

    Note: Don't edit this part with your specific Database credentials.

## Running the Project
1. **Run Migrations:**
    Ensure your database schema is up to date by running Sequelize migrations:

    ```bash
    npx sequelize-cli db:migrate

2. **Start the application:**

    ```bash
    npm start

    The application should now be running on http://localhost:3000.

## Running Migrations
    To apply any new migrations, use the following command:
    ```bash
    npx sequelize-cli db:migrate

    If you need to undo the last migration, use:
    ```bash
    npx sequelize-cli db:migrate:undo

## Running Tests
    To run the unit tests, use:
    ```bash
    npm test

## Additional Notes:
    Debugging: For automatic server restarts during development, consider using nodemon. Install it globally or as a dev dependency:
    ```bash
    npm install --save-dev nodemon