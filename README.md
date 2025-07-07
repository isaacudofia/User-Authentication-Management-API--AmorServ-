# User Authentication Management API

A simple Node.js RESTful API for user registration, login, and profile management using Express, MongoDB (Mongoose), JWT authentication, and input validation.

## Features

- User registration with hashed passwords
- User login with JWT token generation
- Profile management (protected routes)
- Input validation for registration and login
- Error handling middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt (for password hashing)
- JSON Web Token (JWT)
- dotenv (for environment variables)

## Project Structure

```
controllers/
  profileController.js
  userController.js
middlewares/
  auth.js
  errorHandler.js
model/
  userModel.js
routes/
  profileRoute.js
  userAuthRoutes.js
validator/
  inputValidator.js
server.js
package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (cloud)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/isaacudofia/User-Authentication-Management-API--AmorServ-.git
   cd User-Authentication-Management-API--AmorServ
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_PRIVATE_KEY=your_jwt_secret
   JWT_EXPIRES_IN=1d
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Auth Routes

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token

### Profile Routes (Protected)

- `GET /api/profile` — Get user profile (requires JWT)

## Example Request

**Register:**

```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "yourpassword"
}
```

**Login:**

```http
POST /api/auth/login
Content-Type: application/json
{
  "email": "john@gmail.com",
  "password": "yourpassword"
}
```
