const VoteService = require("../services/votes");

module.exports.getVotes = async (req, res) => {
  try {
    const article = await VoteService.get();
    return res.status(200).json({ status: 200, data: article });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
