# RESTful API for Notes

## Project overview
This project involves the development of a secure and scalable RESTful API that enables users to manage notes. Users can perform operations like creating, reading, updating, and deleting notes. Additionally, the application supports note sharing among users and includes a search functionality based on keywords.
## Getting Started

To get started with this application, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Vishal-Borse/SubSpace_Assignment.git
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables,`HASURA_ADMIN_SECRET`.

   ```
   HASURA_ADMIN_SECRET=your-secret-key
   ```

4. Start the Express server:

   To start the server in development mode with automatic code reloading, you can run:
   ```bash
   npm run dev
   ```
   To start the server in production mode, you can run:
   ```bash
   npm start
   ```

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
