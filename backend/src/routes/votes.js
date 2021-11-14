const VotesController = require("../controllers/votes");

module.exports = (router) => {
  router.get("/api/votes", VotesController.getVotes);
};
