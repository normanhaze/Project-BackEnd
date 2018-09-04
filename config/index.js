const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/project-backend'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/project-backend-test'
    }
};

module.exports = config[NODE_ENV];