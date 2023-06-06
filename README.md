# Project Name - Backend
url of the backend :-https://bookstore-ksae.onrender.com/.
This is the backend component of the BookStore project. It provides the necessary APIs and functionality to support the frontend application.

## Technologies Used

- Node.js: Runtime environment for executing JavaScript code on the server.
- Express.js: Web framework for building RESTful APIs and handling HTTP requests.
- MongoDB: Database for storing and retrieving data.
- Mongoose: MongoDB object modeling library for Node.js.
- JWT: JSON Web Tokens for user authentication and authorization.
- bcrypt: Library for hashing passwords.
- Other dependencies as specified in package.json.

## Prerequisites

- Node.js and npm should be installed on your machine.
- MongoDB should be installed and running.

## Getting Started

1. Clone the repository: `git clone https://github.com/Sahilll15/BookStore-server.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables, such as database connection URI, JWT secret key, etc.
4. Start the server: `npm start`
5. The backend server will be running on `http://localhost:4000` by default.

## API Endpoints

- `GET /api/book/getbooks`: Retrieve all books.
- `GET /api/book/getbook/:id`: Retrieve a book by ID.
- `POST /api/book/addbook`: Add a new book.
- `PATCH /api/book/updatebook/:id`: Update a book by ID.
- `DELETE /api/book/deletebook/:id`: Delete a book by ID.
- ... (Add other API endpoints as applicable)

## Authentication and Authorization

- User registration: `POST /api/auth/register`
- User login: `POST /api/auth/login`
- Super User creation:`POST /api/auth/createsuper`
- Protected routes: Use the provided `verifyToken` middleware to authenticate and authorize requests.

## Error Handling

- The server returns appropriate HTTP status codes and error messages in case of any errors or invalid requests.
- Error handling middleware is implemented to catch and handle errors in a consistent manner.

## Contributing

- Fork the repository, make necessary changes, and submit a pull request.
- Report any issues or suggestions in the GitHub issue tracker.




