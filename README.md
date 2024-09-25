# Challenge x Noel Barrera G.

*** 

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Introduction

Warehouse Stock

## Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)
-  JavaScript / Type Script NodeJS / NestJS GraphQL – Apollo server PostgreSQL
  Rest API

## Getting Started

These instructions will help you get the project up and running on your local development environment.

1. Clone the repository:

   ```bash
   git clone git@github.com:leonmex/challengeyara.git
   cd challengeyara

2. Build and start the Docker containers:

    ```bash
   docker compose build
   docker compose up -d

2.1 Migrations
    For migrations, if is not executed on the build you need to use the command
```bash
 docker exec -ti webapp  /bin/sh
```
Ones in side of the container 
```bash
 cd warehouse-management-system
 npx prisma migrate dev --name init && npx prisma db seed
```

## Usage
The project have two access 1 for warehouses 1 for apollo server
- http://localhost
- http://localhost:5433

## Configuration

Configurations you can find for the project or any environment variables that need to be set. You can reference the docker-compose.yml file for configuration options and .env

### Environment Variables

### POSTGRES ###
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgrestest"
POSTGRES_DB="test"
### NODE ####
WEBAPP_PORT=3000
NGINX_PORT=80
### SQL PARAMETERS ###
LIMIT_WAREHOUSE_PRODUCTS_LIST=20

DATABASE_URL="postgresql://postgres:postgrestest@postgres:5432/test?schema=public"

### Ports

Port for the Nginx web server (default: 80).
Postgres database (default: 5432).
Apollo Server (5433)