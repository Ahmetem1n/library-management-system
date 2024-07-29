<a name="readme-top"></a>

<h1 align="center">Library Management System Project</h3>

<!-- TABLE OF CONTENTS -->

## Table of Contents

  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-structure-overview">Project Structure Overview</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#running-the-project">Running The Project</a>
    </li>
    <li>
      <a href="#user-endpoints">User Endpoints</a>
      <ul>
        <li><a href="#list-users">List Users</a></li>
        <li><a href="#get-user-detail">Get User Detail</a></li>
        <li><a href="#add-new-user">Add New User</a></li>
        <li><a href="#borrow-book">Borrow Book</a></li>
        <li><a href="#return-book">Return Book</a></li>
      </ul>
    </li>
    <li>
      <a href="#book-endpoints">Book Endpoints</a>
      <ul>
        <li><a href="#list-books">List Books</a></li>
        <li><a href="#get-book-detail">Get Book Detail</a></li>
        <li><a href="#add-new-book">Add New Book</a></li>
      </ul>
    </li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

- This project is library management system project.
- Currently running locally on port `3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Structure Overview

- **Database Models:** Located in the `src/models` layer.
- **Route Definitions:** Corresponding routes are found in the `src/routes` layer. The `src/routes` layer is directly associated with the `src/controllers` layer.
- **Database CRUD Operations:** Handled in the `src/services` layer.
- **Validation Structure:** There is a validation structure for all endpoint values in the project. All validations are located in the `src/validations` folder within the project's main directory.
- **Middleware Controls:** Necessary intermediate controls are located in the `src/middlewares` layer. (e.g., `throttle middleware`, `validation middleware` etc.)
- **Sensitive Information:** Sensitive information is stored in the .env file. An empty env template named `.env_template` has been created in the project's main folder as an example. To create a `.env` file, it's required to follow this template and create a file named `.env` in the project's main folder. Definitions for the values in the `.env` file can be found in the `config` folder.
- **General Definitions for Express Project:** General definitions for the Express project are located in the `src/index.ts` file in the project's main folder.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![javascript][javascript]][javascript-url]
- [![typescript][typescript]][typescript-url]
- [![nodejs][nodejs]][nodejs-url]
- [![expressjs][expressjs]][expressjs-url]
- [![postgresql][postgresql]][postgresql-url]
- [![sequelize][sequelize]][sequelize-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running The Project

Navigate to the project's root directory, then, apply the following commands sequentially:

```shell
>> npm install
>> npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Endpoints

These endpoints are used for the user functions.

### List Users

This endpoint is used to list users.\
**Endpoint Path:** `{{API_DOMAIN}}/users`\
**Method:** `GET`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Get User Detail

This endpoint is used to get user detail.\
**Endpoint Path:** `{{API_DOMAIN}}/users/:id`\
**Method:** `GET`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Add New User

This endpoint is used to add new user.\
**Endpoint Path:** `{{API_DOMAIN}}/users`\
**Method:** `POST`\
**Body:**

```json
{
  "name": "string (required)"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Borrow Book

This endpoint is used to borrow book.\
**Endpoint Path:** `{{API_DOMAIN}}/users/:userId/borrow/:bookId`\
**Method:** `POST`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Return Book

This endpoint is used to return book.\
**Endpoint Path:** `{{API_DOMAIN}}/users/:userId/return/:bookId`\
**Method:** `POST`\
**Body:**

```json
{
  "score": "number (required)"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Book Endpoints

These endpoints are used for the book functions.

### List Books

This endpoint is used to list books.\
**Endpoint Path:** `{{API_DOMAIN}}/books`\
**Method:** `GET`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Get Book Detail

This endpoint is used to get book detail.\
**Endpoint Path:** `{{API_DOMAIN}}/books/:id`\
**Method:** `GET`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Add New Book

This endpoint is used to add new book.\
**Endpoint Path:** `{{API_DOMAIN}}/books`\
**Method:** `POST`\
**Body:**

```json
{
  "name": "string (required)"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[javascript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: https://www.javascript.com
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[sequelize]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[sequelize-url]: https://sequelize.org
[nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org
[expressjs]: https://img.shields.io/badge/express.js-86898a?style=for-the-badge&logo=express&logoColor=white
[expressjs-url]: https://expressjs.com
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org
