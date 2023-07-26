FROM postgres:latest

# Copy the SQL script into the Docker container
COPY infra/setup.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432