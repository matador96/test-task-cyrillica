const fetch = require("node-fetch"),
  config = require("../../config"),
  VotesService = require("../services/votes");

module.exports.getAndSave = async () => {
  try {
    await fetch(config.parseUrl)
      .then((res) => res.json())
      .then(async (json) => {
        await VotesService.clean();
        VotesService.add(json);
      });
  } catch (e) {
    throw Error(e.message);
  }
};
