# PERN CRUD User Management System

A clean, scalable User Management System built with PostgreSQL, Express.js, React/Vite, Node.js and Prisma ORM.

## Features

- User CRUD
- Role CRUD
- One-to-many User/Role relationship
- Unique user email and role name
- Role deletion protection when users are assigned
- Backend validation with Zod
- Prisma error handling
- Search by user name, email or role
- Role filter
- Server-side pagination
- Loading and friendly error states
- Responsive admin dashboard
- Idempotent Prisma seed data

## Project structure

```text
pern-crud/
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

## PostgreSQL setup

Create a database named `pern_crud`.

Example:

```sql
CREATE DATABASE pern_crud;
```

## Backend setup

```bash
cd server
npm install
copy .env.example .env
```

On macOS/Linux use:

```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env` with your PostgreSQL credentials.

Then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Frontend setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Optionally create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API endpoints

### Users

| Method | Endpoint       | Purpose     |
| ------ | -------------- | ----------- |
| GET    | /api/users     | List users  |
| GET    | /api/users/:id | Get user    |
| POST   | /api/users     | Create user |
| PUT    | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

Pagination/search example:

```text
GET /api/users?page=1&limit=10&search=john&roleId=1
```

### Roles

| Method | Endpoint       | Purpose     |
| ------ | -------------- | ----------- |
| GET    | /api/roles     | List roles  |
| GET    | /api/roles/:id | Get role    |
| POST   | /api/roles     | Create role |
| PUT    | /api/roles/:id | Update role |
| DELETE | /api/roles/:id | Delete role |

### Health

```text
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "API is running"
}
```

## Example requests

Create user:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "roleId": 1
}
```

Create role:

```json
{
  "name": "Manager",
  "description": "Manages application operations."
}
```

## Common errors

### DATABASE_URL is missing

Make sure `server/.env` exists and contains a valid `DATABASE_URL`.

### Cannot connect to PostgreSQL

Check that PostgreSQL is running, the database exists, and the username/password are correct.

### Unique constraint error

User emails and role names must be unique.

### Cannot delete a role

A role cannot be deleted while one or more users are assigned to it. Reassign/delete those users first.

## Architecture

The backend follows:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL
```

Controllers handle HTTP concerns while services contain business logic.

## Production notes

Before deploying publicly, add authentication/authorization, security headers, rate limiting, structured logging, automated tests, database backups, and a production deployment configuration.

## Biplap Neupane
