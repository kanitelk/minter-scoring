const superagent = require("superagent");
const config = require("../config");

exports.getAddressInfo = async function (address) {
  const responce = await superagent
    .get(config.explorerURL + "/addresses/" + address)
    .retry(3);

  return responce.body.data.balances;
};

exports.getAddressInfoFromNode = async function (address) {
  const responce = await superagent
    .get(config.nodeURL + "/address?address=" + address)
    .retry(3);

  return responce.body.result;
};

exports.getWalletAge = async function (address) {
  const responce = await superagent
    .get(config.explorerURL + "/addresses/" + address + "/transactions")
    .retry(3);

  const res = await superagent
    .get(
      config.explorerURL +
        "/addresses/" +
        address +
        "/transactions?page=" +
        responce.body.meta.last_page
    )
    .retry(3);

  return res.body.data[res.body.data.length - 1].timestamp;
};

exports.getTransactions = async function (address) {
  let arr = [];
  const responce = await superagent
    .get(
      config.explorerURL + "/addresses/" + address + "/transactions?limit=1000"
    )
    .retry(3);

  arr = [...responce.body.data.filter((tx) => tx.type !== 7)];
  if (responce.body.meta.last_page > 1) {
    let last =
      responce.body.meta.last_page > config.txLimitPage
        ? config.txLimitPage
        : responce.body.meta.last_page;
    for (let i = 2; i <= last; i++) {
      let res = await superagent
        .get(
          config.explorerURL +
            "/addresses/" +
            address +
            `/transactions?limit=1000&page=${i}`
        )
        .retry(3);

      arr = [...arr, ...res.body.data.filter((tx) => tx.type !== 7)];
    }
  }

  return arr;
};

exports.getAllTransactions = async function (address) {
  let arr = [];
  const responce = await superagent
    .get(
      config.explorerURL + "/addresses/" + address + "/transactions?limit=1000"
    )
    .retry(3);

  arr = [...responce.body.data];
  if (responce.body.meta.last_page > 1) {
    for (let i = 2; i <= responce.body.meta.last_page; i++) {
      let res = await superagent
        .get(
          config.explorerURL +
            "/addresses/" +
            address +
            `/transactions?limit=1000&page=${i}`
        )
        .retry(3);

      arr = [...arr, ...res.body.data];
    }
  }

  return arr;
};

exports.getDelegations = async function (address) {
  const responce = await superagent
    .get(
      config.explorerURL + "/addresses/" + address + "/delegations?limit=1000"
    )
    .retry(3);

  return responce.body;
};

exports.getCoins = async function () {
  const responce = await superagent.get(config.explorerURL + "/coins").retry(3);

  return responce.body.data;
};

exports.getBlocksHeight = async function () {
  const responce = await superagent
    .get(config.explorerURL + "/status")
    .retry(3);
  return responce.body.data.latestBlockHeight;
};

exports.getIcon = async function (address) {
  const responce = await superagent
    .get("http://minterscan.pro/addresses/" + address + "/icon")
    .retry(3);

  return responce.body;
};

exports.getMinterscanProfile = async function (address) {
  const responce = await superagent
    .get("http://minterscan.pro/profiles/" + address)
    .ok((res) => res.status < 500);

  return responce.body;
};

exports.getTxInfo = async function (hash) {
  const responce = await superagent
    .get(config.explorerURL + "/transactions/" + hash)
    .retry(3);

  return responce.body;
};
