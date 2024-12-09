# Task Management API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for tasks
- Filtering by status and priority
- Sorting and pagination
- Input validation
- Error handling
- Logging
- Soft delete implementation

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/task-management
   NODE_ENV=development
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Create Task
```
POST /api/tasks
```
Body:
```json
{
  "title": "Complete project",
  "description": "Finish the task management API",
  "priority": "HIGH",
  "dueDate": "2023-12-31T00:00:00.000Z"
}
```

### Get All Tasks
```
GET /api/tasks
```
Query parameters:
- status: TODO, IN_PROGRESS, COMPLETED
- priority: LOW, MEDIUM, HIGH
- sort: createdAt, -createdAt, dueDate, -dueDate
- page: number
- limit: number

### Get Task by ID
```
GET /api/tasks/:id
```

### Update Task
```
PUT /api/tasks/:id
```

### Delete Task
```
DELETE /api/tasks/:id
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Testing

Run tests:
```bash
npm test
```

## Logging

Logs are stored in:
- error.log: Error level logs
- combined.log: All logs

## Design Decisions

1. **Soft Delete**: Implemented to maintain data history
2. **Validation**: Using Joi for robust input validation
3. **Error Handling**: Centralized error handling middleware
4. **Logging**: Winston for structured logging
5. **Pagination**: Implemented to handle large datasets efficiently