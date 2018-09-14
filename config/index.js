const NODE_ENV = process.env.NODE_ENV || "production";

const config = {
  development: {
    DB_URL: "mongodb://localhost:27017/project-backend"
  },
  test: {
    DB_URL: "mongodb://localhost:27017/project-backend-test"
  },
  production: {
    DB_URL:
      "mongodb://project-team:northcoders18@ds243812.mlab.com:43812/paint-the-town"
  }
};

module.exports = config[NODE_ENV];
