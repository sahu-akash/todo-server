
# [Node/Express Todo backend Application]

https://github.com/sahu-akash/todo-client can be used as a frontend application for this code.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required Dependencies
- `npm run start-dev` or `npx nodemon main.js` to start the local server


## Automated Testing

To get the Test case running locally:

- Clone this repo
- `npm install` to install all required Dependencies
- `npm test`  or `npm run test` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [body-parser] - TO Parse incoming request bodies in a middleware before your handlers
- [uuid] - To get unique number that can be used as an ID.


## Application Structure

- `main.js` - The entry point to our application. This file defines our express server and exposes the endpoints
- `app.js` - Contains the http methods for handling api requests.
