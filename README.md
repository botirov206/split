# Fullstack User Management Application

A simple fullstack application with user registration and authentication features.

## Features

- User registration
- User login with JWT authentication
- View registered users list
- RESTful API endpoints

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - JSON Web Tokens (JWT)
  - CORS

- **Frontend:**
  - Vanilla JavaScript
  - HTML
  - CSS

## API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/users` - Get all users

## Project Structure

```
├── frontend/
│   ├── index.html
│   ├── index.js
│   └── style.css
├── src/
│   ├── controllers/
│   ├── routes/
│   └── services/
└── server.js
```

## Port

Server runs on `http://localhost:3000`

## Getting Started


### Clone the Repository

```bash
git clone https://github.com/yourusername/fullstack-user-management.git
cd fullstack-user-management
```

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open `frontend/index.html` in browser by Live Server

