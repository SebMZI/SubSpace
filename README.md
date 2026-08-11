# SubSpace

![Subspace](./docs/logo/Subspace_Banner.webp)

---

## Introduction

SubSpace was created from a personal need for privacy and control over YouTube subscriptions.
It provides a self-hosted solution to manage, organize, and access your favorite channels and videos without relying on YouTube’s default subscription system.

With SubSpace, you can save channels or videos, categorize them using custom tags, and open them directly on YouTube when needed — all while keeping your preferences private.

## Installation

To install Subspace, there are two different ways.

### Git

1. Clone the repository on your local device
```shell
git clone https://github.com/SebMZI/SubSpace.git 
cd SubSpace
```

2. Install the dependencies
```shell
npm install
```

3. Start the server
```shell
cd backend
npm run start
```
It will start the server on http://localhost:3000 (3000 by default)

4. Start the client
```shell
cd frontend
npm run start
```

### Docker Compose (Recommended)
Copy/Paste the docker compose file
```dockerfile
services:
  frontend:
    image: mziseb/subspace-frontend:latest
    ports:
      - "5173:5173"
    environment:
        VITE_API_URL: ${API_URL}
    depends_on:
      - backend

  backend:
      image: mziseb/subspace-backend:latest
      ports:
        - "3000:3000"
      environment:
        PORT: 3000
        DB_PG_USERNAME: ${POSTGRES_USER}
        DB_PG_PASSWORD: ${POSTGRES_PASSWORD}
        DB_PG_DATABASE: ${POSTGRES_DB}
        DB_PG_HOST: db
        PWD_SALT: ${PWD_SALT}
        JWT_SECRET: ${JWT_SECRET}
        JWT_EXPIRES_IN: ${JWT_EXPIRES_IN}
    depends_on:
      db:
        condition: service_healthy

  db:
      image: postgres:17
      environment:
        POSTGRES_USER: ${POSTGRES_USER}
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
        POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d subspace"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## Roadmap
- [ ] Chrome Extension

## Appreciation
My sincere thanks to [Mylano](https://github.com/Mylaano) for his generous help in designing the frontend.