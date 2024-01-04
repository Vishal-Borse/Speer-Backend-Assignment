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


## Caching Mechanism

This application uses Lodash's `_.memoize` function for caching the results of blog statistics and blog searches. The cache is cleared automatically every 20 seconds to ensure that the data remains up-to-date.

## API Endpoints

The server exposes the following API endpoints:

- `GET /api/blog-stats`: Retrieves blog statistics, including the total number of blogs, the title of the longest blog, the number of blogs with "privacy" in their title, and unique blog titles. Lodash is used for data analysis in this endpoint.

- `GET /api/blog-search?query=your_query_here`: Performs a blog search based on a query parameter. It returns a list of blog titles that match the query. Lodash is used for searching and data manipulation in this endpoint.

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
