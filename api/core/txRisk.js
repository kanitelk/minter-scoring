const scoring = require("./main");
const utils = require("../controllers/utils");

const txRisk = async txHash => {
  let txData = await utils.getTxInfo(txHash);
};

module.exports = txRisk;
