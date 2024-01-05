# RESTful API for Notes

## Project overview
This project involves the development of a secure and scalable RESTful API that enables users to manage notes. Users can perform operations like creating, reading, updating, and deleting notes. Additionally, the application supports note sharing among users and includes a search functionality based on keywords.

## Technical Stack
- **Framework:** Express.js (Node.js)
  Express.js was chosen as the framework for its simplicity, flexibility, and wide adoption in the Node.js community. It provides a robust set of features for building web and mobile applications.
  
- **Database:** MongoDB
  MongoDB was selected as the database due to its schema-less nature, scalability, and compatibility with JSON-like documents. This NoSQL database is well-suited for handling unstructured data like notes.
  
- **Authentication:** JSON Web Token (JWT)
  JWT was chosen for authentication due to its stateless nature and simplicity. It allows secure transmission of user information between parties and is widely used in web development.
  
- **Rate Limiting:** express-rate-limit
  express-rate-limit is used to implement rate limiting and request throttling. This helps protect the API from abuse, ensuring fair usage and preventing potential security threats.
  
- **Testing Frameworks**: Jest
  Jest was chosen as the testing framework for its simplicity, speed, and built-in assertion library. It provides comprehensive testing capabilities, including unit tests and integration tests.
  
- **Search Indexing:** MongoDB Text Indexing
  MongoDB Text Indexing was implemented for search functionality. This feature allows efficient text-based searches on indexed fields, providing a fast and scalable solution for keyword searches in notes.

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
- `POST /api/auth/signup`: create a new user account.
| Body          | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `username`    | `string` | **Required**. Your Username    |
| `email`       | `string` | **Required**. Your Email       |
| `password`    | `string` | **Required**. New Password     |

- `POST /api/auth/login`: log in to an existing user account and receive an access token.
| Body       | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `email  `  | `string` | **Required**. Your Email   |
| `password` | `string` | **Required**. New Password |


### Note Endpoints
- `GET /api/notes`: get a list of all notes for the authenticated user.
- `GET /api/notes`: get a note by ID for the authenticated user.
- `POST /api/notes`: create a new note for the authenticated user.
| Body          | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `title`       | `string` | **Required**. Title of the note |
| `description` | `string` | Description of the note         |

- `PUT /api/notes/:id`: update an existing note by ID for the authenticated user.
| Body          | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `title`       | `string` | Title of the note       |
| `description` | `string` | Description of the note |

- `DELETE /api/notes/:id`: delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: share a note with another user for the authenticated user.
| Body          | Type     | Description                                        |
| :------------ | :------- | :------------------------------------------------- |
| `shareUserId` | `string` | **Required**. Email of the user to share the note. |
- `GET /api/search?q=:query`: search for notes based on keywords for the authenticated user.
| Query | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `q`   | `string` | **Required**. Keyword for searching. |



## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vishal-borse-971241212/)


