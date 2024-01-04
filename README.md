# RESTful API for Notes

## Project overview
This project involves the development of a secure and scalable RESTful API that enables users to manage notes. Users can perform operations like creating, reading, updating, and deleting notes. Additionally, the application supports note sharing among users and includes a search functionality based on keywords.

## Technical Stack
- **Framework:** Express.js (Node.js)
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Rate Limiting:** express-rate-limit
- **Testing Frameworks**: Jest
- **Search Indexing:** MongoDB Text Indexing

## Setup
### Prerequisites
- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)

### Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/Vishal-Borse/Speer-Backend-Assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd speer-assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env file in the root directory and add the following:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key_for_jwt
   ```
   
### Run the Application

   To start the server in development mode with automatic code reloading, you can run:
   ```bash
   npm run dev
   ```

   To start the server in production mode, you can run:
   ```bash
   npm start
   ```
The server will start at http://localhost:5000.

### Run the Tests

   ```bash
   npm test
   ```
This will run the unit and integration tests.


## API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup`: create a new user account..
- `POST /api/auth/login`: log in to an existing user account and receive an access token.

### Note Endpoints
- `GET /api/notes`: get a list of all notes for the authenticated user.
- `GET /api/notes`: get a note by ID for the authenticated user.
- `POST /api/notes`: create a new note for the authenticated user.
- `PUT /api/notes/:id`: update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: search for notes based on keywords for the authenticated user.


## Error Handling

The server handles various types of errors:

- HTTP response errors (e.g., 404, 401): Proper error responses are sent to the client with relevant error messages.

- Timeout errors: If a request times out, a 504 Gateway Timeout error is returned.

- Other types of errors: Internal server errors (500) are returned for other types of errors, and error messages are logged to the console.

## Usage

You can use this Express server to fetch blog statistics and perform blog searches by making HTTP GET requests to the specified API endpoints.

Example usage:

- Fetch blog statistics:

  ```http
  GET /api/blog-stats
  ```

- Perform a blog search:

  ```http
  GET /api/blog-search?query=your_query_here
  ```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
