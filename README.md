# To-Do List Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

The To-Do List Application is a full-stack web application designed to help users manage their daily tasks. Users can register, log in, and manage their tasks with a user-friendly interface. The application supports CRUD operations on tasks and includes features like prioritization, due dates, and subtasks.

## Features

- User Authentication (Registration, Login, Logout)
- Add, Update, Delete Tasks
- Prioritize Tasks (Low, Medium, High)
- Set Due Dates for Tasks
- Add Subtasks
- Dark Mode Toggle
- User-specific Task Management

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/evanknight18/todo-list.git
   cd todo-list
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the MongoDB server (skip if using MongoDB Atlas).

2. Create a `.env` file in the `backend` directory and add the following:

   ```env
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

3. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

4. Start the frontend development server:

   ```sh
   cd frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user

### Tasks

- **GET** `/api/tasks` - Get all tasks for the logged-in user
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)
