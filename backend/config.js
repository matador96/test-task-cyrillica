const config = {
  database: {
    mongodbUrl: "mongodb://localhost:27017",
    username: "root",
    password: "",
    database: "database",
    host: "localhost",
    db_port: "21017",
  },
  port: "3003",
  frontendUrl: "http://localhost:3000",
  parseUrl: "https://api.voxqube.com:7000/api/v2/voices/list",
};

module.exports = config;
