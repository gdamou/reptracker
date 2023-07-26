# Infrastructure Files

This directory contains the necessary files to set up a PostgreSQL database using Docker for the monorepo project.

## setup.sql

The `setup.sql` script contains the SQL commands to create the required database and tables. It will be automatically executed when the PostgreSQL container starts.

## Building PostgreSQL with Docker

To set up the PostgreSQL database, you need to build a Docker image using the provided Dockerfile.

Run the following command from the root of the monorepo to build the PostgreSQL image:

```bash
docker build -t reptracker-db -f infra/Dockerfile .
```
## Running the PostgreSQL Container

After building the Docker image, you can run the PostgreSQL container with the following command:

```bash
docker run -d --name reptracker -p 5432:5432 -e POSTGRES_PASSWORD=docker reptracker-db
```