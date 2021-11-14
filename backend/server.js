const express = require("express"),
  routes = require("./src/routes/_all.js"),
  config = require("./config.js"),
  app = express(),
  cors = require("cors"),
  mongoose = require("mongoose");

const corsOptions = {
  origin: config.frontendUrl,
};
app.use(cors(corsOptions));

routes(app);

mongoose.connect(config.database.mongodbUrl, function (err) {
  if (err) throw err;
  console.log("[DB] Mongoose connected");
  require("./src/parser/parseVotes")
    .getAndSave()
    .then(() => {
      console.log("[DATA] Parsed and saved");
    });
});

app.listen(config.port, async () => {
  console.log(`[SERVER] Listening on port ${config.port}`);
});
