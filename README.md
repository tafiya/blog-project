# Blog Project Backend

## Overview
The Blog Platform Backend is a RESTful API designed to support a blogging platform. It enables users to create, update, delete, and manage blogs. The system includes role-based access control with two primary roles: Admin and User. Admins can manage users and delete any blog, while users can perform CRUD operations on their own blogs. The platform also provides a public API for viewing blogs with advanced search, sort, and filter functionalities.

---

## Features

### User Roles
- **Admin**:
  - Created manually in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**:
  - Secure user login with JWT tokens.
- **Authorization**:
  - Role-based access control to ensure security and separation of concerns.

### Blog Management
- Create, update, and delete blogs.
- Public API for viewing blogs with:
  - **Search**: Find blogs by title or content.
  - **Sorting**: Sort blogs by fields like `createdAt` or `title`.
  - **Filtering**: Filter blogs by author ID.

### Admin Actions
- Block users.
- Delete any blog.

### Error Handling
- Structured error responses.
- Covers authentication, authorization, validation, and internal server errors.

---

## Technologies Used
- **Programming Language**: TypeScript
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod for schema validation

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/)

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```     
4. Create a `.env` file and configure the following variables:
  ```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookshop
```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the API at `http://localhost:5000`.

### Scripts
- **Start Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Start Production Server**: `npm start`

---

### API Endpoints

#### Authentication
- **Register User**: `POST /api/auth/register`
- **Login User**: `POST /api/auth/login`

#### Blog Management
- **Create Blog**: `POST /api/blogs`
- **Update Blog**: `PATCH /api/blogs/:id`
- **Delete Blog**: `DELETE /api/blogs/:id`
- **Get All Blogs (Public)**: `GET /api/blogs`

#### Admin Actions
- **Block User**: `PATCH /api/admin/users/:userId/block`
- **Delete Blog**: `DELETE /api/admin/blogs/:id`
## Error Handling
The application uses a consistent error response structure:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Error stack trace"
}
```
# Error Types

## Common Error Types

This project handles the following common error types:

### 1. `ZOD_ERROR` (Validation Errors)
Occurs when there are validation issues, such as data not meeting the required schema constraints.

### 2. `AUTH_ERROR` (Authentication Errors)
Occurs when the user fails to authenticate properly, such as providing incorrect credentials.

### 3. `AUTHORIZATION_ERROR` (Unauthorized Access)
Occurs when a user tries to access a resource they are not authorized to access.

### 4. `NOT_FOUND_ERROR` (Resource Not Found)
Occurs when a requested resource cannot be found in the database or API.

### 5. `INTERNAL_SERVER_ERROR` (Unexpected Server Issues)
Occurs when there is an unexpected issue on the server, such as database failures or other internal errors.

## Testing
Use tools like **Postman** or **cURL** to test the API endpoints.

## Video Explanation
Provide a link to a video explaining the API design and functionality:  
[Video Link](https://www.loom.com/share/1e21ffbcc78b4713a962a5235090e3bd?sid=b83166a9-14e1-46f1-b9b0-8265fdfe2ded)

## Live Link
Provide the link to the live deployed application:  
[Live Link](https://book-shop-server-githubnew.vercel.app/)

   
     
