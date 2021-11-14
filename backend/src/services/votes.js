const Votes = require("../models/votes");

module.exports.get = async () => {
  try {
    return await Votes.find();
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.clean = async () => {
  try {
    await Votes.deleteMany();
    return;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.add = async (json) => {
  try {
    await Votes.insertMany(json);
    return;
  } catch (e) {
    throw Error(e.message);
  }
};
