# Paint the Town API
Paint the town is a iOS application which uses geolocation to draw the users path, using different colours and widths. This API allows journey and user data to be stored and retrieved from a MongoDB database. A full list of endpoints is provided on the homepage.

The following instructions will allow you to set up the API and seed a MongoDB database with dev data.

[Here is a link to a hosted version of the application.](https://paint-the-town-api.herokuapp.com/api) 

## Getting Started

### Prerequisites
To set up the API, you will need [Node](https://nodejs.org/en/download/) and [Mongo](https://docs.mongodb.com/manual/installation/) installed on your machine. Follow the links for instructions on how to do this.

### Installing
Fork and clone the [repository from Github](https://github.com/normanhaze/Project-BackEnd). 

Navigate into the directory on your command line and run ```npm install``` to install the required dependencies. These are as follows:
* Body parser: ^1.18.3,
* CORS: ^2.8.4,
* Express: ^4.16.3,
* Mongoose: ^5.2.12

In order to run the test suite, you will also need the following:
* Chai: ^4.1.2,
* Mocha: 5.2.0,
* Nodemon: ^1.18.4,
* Supertest: ^3.1.0

### Config

You will need to set up a ```config``` file to connect to your MongoDB databases. A test database will seed rather than the main database if the process.env.NODE_ENV is set to "test".

The below is an example of how to set your file to host the API locally:
```js 
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/project-backend'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/project-backend-test'
    };
};

module.exports = config[NODE_ENV];
```

### Seeding your database
Run ```mongod``` in the command line to connect to MongoDB. Once it is connected it should say "waiting for connections on port 27017". This should be left running - open another tab to continue using the command line.

If the database is not connecting, try closing and reopening your terminal or killing the process. If it loses connection while you're using it, use Control+C to exit and then run ```mongod``` again.

Run ```npm run seed``` in the command line to seed your dev database. "Data seeding successful" will be logged to the console once the seeding has been completed.

### Running the Server
Run ```npm start``` in the command line to run your server. "Connected to Mongo" and "listening on port" will log to the console if configured correctly. Requests can now be made to the server.

## Testing
With MongoDB connected, run ```npm test``` in the command line to run the provided tests. These tests check the endpoints for each route, including errors for bad requests and bad routes. The test database will be reseeded before each test to ensure consistency.

If the test responses are not as expected, check that you have successfully set up your config file.

## Authors
* Hazel Normandale - *github.com/normanhaze*
* Louise Wright - *github.com/louillustrator*
* Tara Galloway - *github.com/crylittlesister*
* Rosie Amphlett - *github.com/rosieamphlett*
* Robert Davidson - *github.com/robd33*
* Ilina K - *github.com/sylfie*

Advice and support provided by the Northcoders team.
