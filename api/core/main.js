const base64 = require("js-base64").Base64;
const fs = require("fs");

const Wallet = require("../models/Wallet");
const Genesis = require("../models/Genesis");
const MinterscanProfile = require("../models/MinterscanProfile");
const config = require("../config");
const utils = require("../controllers/utils");

const { Minter } = require("minter-js-sdk");
const minterSDK = new Minter({ apiType: "node", baseURL: config.nodeURL });

const scoring = async address => {
  let res = await getRating(address);
  res._id = res.address;
  Wallet.findOneAndUpdate({ _id: address }, res, { upsert: true }, err => {
    if (err) console.log(err);
  });
  return res;
};

const getTxWalletParams = async address => {
  let profile = await MinterscanProfile.findById(address);
  let score = await Wallet.findById(address);

  if (score) score = score.score;
  if (profile) profile = profile.title;

  return {
    score: score,
    profile: profile
  };
};

const getRating = async address => {
  let score = 0;

  let profile = await MinterscanProfile.findById(address);
  let genesis = await Genesis.findOne({ address: address });

  if (profile && profile.isVerified === true) score += 10;
  if (genesis) score += 25;

  let balances = await utils.getAddressInfo(address);
  let delegations = await utils.getDelegations(address);
  let transactions = await utils.getTransactions(address);
  let coins = await utils.getCoins();

  let totalDelegatedBipValue = Math.round(
    delegations.meta.additional.total_delegated_bip_value
  );
  let totalBipBalance = 0;

  for (let item of balances) {
    if (item.coin === "BIP") {
      item.bip_value = +item.amount;
      totalBipBalance += +item.amount;
    } else {
      try {
        let a = await minterSDK.estimateCoinSell({
          coinToSell: item.coin,
          valueToSell: +item.amount,
          coinToBuy: "BIP"
        });
        item.bip_value = +a.will_get;
        totalBipBalance += +a.will_get;
      } catch (error) {
        console.log(error.responce);
      }
    }
  }

  let icon = getIcon(totalDelegatedBipValue, totalBipBalance);
  let iconName = getIconName(totalDelegatedBipValue, totalBipBalance);

  delegations = delegations.data;
  let delegatedKarma = getDelegatedKarma(delegations);
  let balanceKarma = getBalanceKarma(balances);
  let receivedKarma = 0;

  score += scoreDelegations(delegations, totalDelegatedBipValue);
  score += scoreBalances(balances);
  score += scoreTransactions(transactions);
  score += scoreDelegatedKarma(delegatedKarma);

  let scamTx = [],
    respectTx = [],
    verificationTx = [],
    coinsTx = [];
  let smart_expert = 0,
    smart_rating = 0;

  //transactions checker
  if (transactions.length === undefined) return;
  for (let i = 0; i < transactions.length; i++) {
    // Receive to wallet karma
    if (
      transactions[i].data.to === address &&
      transactions[i].data.coin === "KARMA"
    ) {
      receivedKarma += +transactions[i].data.value;
    }

    // Receive to wallet karma MULTISEND
    if (
      transactions[i].from === "Mx12537fc0b58c4b26c74b2b8f3bed50c47557119c" &&
      transactions[i].payload === "R0VORVNJUyBLWUMgT0s="
    ) {
      receivedKarma += 0.0175796;
    }
    // Minus sended from wallet karma
    if (
      transactions[i].from === address &&
      transactions[i].data.coin === "KARMA"
    ) {
      receivedKarma -= +transactions[i].data.value;
    }

    // Smart get EXPERT
    if (
      transactions[i].from === "Mx4dd17ad8d43ac35c9449f11ab150d27f8833540e" &&
      transactions[i].data.coin === "EXPERT"
    ) {
      smart_expert += +transactions[i].data.value;
      score += 5;
    }

    // Smart get RATING
    if (
      transactions[i].from === "Mx3224b7d1a85d972c0831f9fec27b9127cde4e54b" &&
      transactions[i].data.coin === "RATING"
    ) {
      smart_rating += +transactions[i].data.value;
      score += 5;
    }

    // Create coins Tx
    if (transactions[i].type == 5) {
      coinsTx.push(transactions[i].data);
    }

    // SCAM
    if (
      (transactions[i].data.to === address &&
        base64
          .decode(transactions[i].payload)
          .toLowerCase()
          .includes("scam")) ||
      (transactions[i].data.to === address &&
        transactions[i].data.coin === "SCAM")
    ) {
      if (
        base64
          .decode(transactions[i].payload)
          .toLowerCase()
          .includes("antiscam")
      ) {
        let walletData = await getTxWalletParams(transactions[i].from);
        let pushData = transactions[i];
        pushData.profile = walletData.profile;
        pushData.score = walletData.score;
        respectTx.push(pushData);
        continue;
      }
      let walletData = await getTxWalletParams(transactions[i].from);
      let pushData = transactions[i];
      pushData.profile = walletData.profile;
      pushData.score = walletData.score;
      scamTx.push(transactions[i]);
      continue;
    }

    // RESPECT
    if (
      transactions[i].data.to === address &&
      base64
        .decode(transactions[i].payload)
        .toLowerCase()
        .includes("respect")
    ) {
      let walletData = await getTxWalletParams(transactions[i].from);
      let pushData = transactions[i];
      pushData.profile = walletData.profile;
      pushData.score = walletData.score;
      respectTx.push(pushData);
      continue;
    }
    // VERIFICATION
    if (
      transactions[i].data.to === address &&
      base64
        .decode(transactions[i].payload)
        .toLowerCase()
        .includes("verification")
    ) {
      let walletData = await getTxWalletParams(transactions[i].from);
      let pushData = transactions[i];
      pushData.profile = walletData.profile;
      pushData.score = walletData.score;
      verificationTx.push(pushData);
      continue;
    }
  }

  if (receivedKarma < 0) receivedKarma = 0;

  let existCoins = 0;
  if (coinsTx.length > 0) {
    for (let i = 0; i < coinsTx.length; i++) {
      for (let j = 0; j < coins.length; j++) {
        if (coins[j].symbol === coinsTx[i].symbol) {
          existCoins += 1;
          break;
        }
      }
    }
  }

  let age;
  if (transactions.length > 0)
    age = transactions[transactions.length - 1].timestamp;
  else age = Date.now();

  if (score > 100) score = 100;

  let resultWallet = {
    address: address,
    score: score,
    profile: profile,
    icon: icon,
    iconName: iconName,
    age: age,
    genesis: Boolean(genesis),
    smart_expert: smart_expert,
    smart_rating: smart_rating,
    totalDelegatedBip: totalDelegatedBipValue,
    totalBip: totalDelegatedBipValue + totalBipBalance,
    delegatedKarma: delegatedKarma,
    balanceKarma: balanceKarma,
    receivedKarma: receivedKarma,
    balances: balances,
    transactions: transactions.length,
    coins: coinsTx,
    existCoins: existCoins,
    scamTx: scamTx,
    respectTx: respectTx,
    verificationTx: verificationTx,
    updatedAt: new Date()
  };

  return resultWallet;
};

const scoreDelegations = (delegations, totalBipValue) => {
  // TOTAL DELEGATED BIP
  let score = 0;
  if (delegations.length > 3) score += 2;

  if (totalBipValue >= 10 && totalBipValue < 100) score += 1;
  if (totalBipValue >= 100 && totalBipValue < 1000) score += 3;
  if (totalBipValue >= 1000 && totalBipValue < 10000) score += 10;
  if (totalBipValue >= 10000 && totalBipValue < 100000) score += 25;
  if (totalBipValue >= 100000 && totalBipValue < 1000000) score += 60;
  if (totalBipValue >= 1000000) score += 100;
  return score;
};

const getDelegatedKarma = delegations => {
  let res = 0;
  for (let i = 0; i < delegations.length; i++) {
    if (delegations[i].coin === "KARMA") {
      res = res + +delegations[i].value;
    }
  }
  return res;
};

const getBalanceKarma = balances => {
  let val = 0;
  for (let i = 0; i < balances.length; i++) {
    if (balances[i].coin === "KARMA") {
      val += +balances[i].amount;
    }
  }
  return val;
};

const scoreBalances = balances => {
  let score = 0;

  // COINS NUMBER
  if (balances.length === 0) score += 0;
  if (balances.length === 1) score += 1;
  if (balances.length > 3 && balances.length < 6) score += 2;
  if (balances.length >= 6) score += 3;

  for (let i = 0; i < balances.length; i++) {
    // BIP
    if (balances[i].coin === "BIP") {
      if (balances[i].amount >= 300 && balances[i].amount < 1000) score += 1;
      if (balances[i].amount >= 1000 && balances[i].amount < 10000) score += 3;
      if (balances[i].amount >= 10000 && balances[i].amount < 100000)
        score += 25;
      if (balances[i].amount >= 100000 && balances[i].amount < 1000000)
        score += 60;
      if (balances[i].amount >= 1000000) score += 100;
    }

    // KARMA
    if (balances[i].coin === "KARMA") {
      let val = balances[i].amount;
      if (val > 0 && val < 0.001) score += 1;
      if (val >= 0.001 && val < 0.01) score += 2;
      if (val >= 0.01 && val < 0.1) score += 8;
      if (val >= 0.1 && val < 1) score += 27;
      if (val >= 1 && val < 10) score += 45;
      if (val >= 10) score += 100;
    }
  }
  return score;
};

const scoreDelegatedKarma = val => {
  let score = 0;
  if (val > 0 && val < 0.001) score += 1;
  if (val >= 0.001 && val < 0.01) score += 3;
  if (val >= 0.01 && val < 0.1) score += 10;
  if (val >= 0.1 && val < 1) score += 30;
  if (val >= 1 && val < 10) score += 50;
  if (val >= 10) score += 100;
  return score;
};

const scoreTransactions = transactions => {
  let score = 0;
  if (transactions.length > 0 && transactions.length < 10) score += 0;
  if (transactions.length >= 10 && transactions.length < 50) score += 1;
  if (transactions.length >= 10 && transactions.length < 50) score += 2;
  if (transactions.length >= 50 && transactions.length < 200) score += 4;
  if (transactions.length >= 200 && transactions.length < 600) score += 7;
  if (transactions.length >= 600) score += 10;

  return score;
};

const getIcon = (totalDelegatedBipValue, totalBipBalance) => {
  let icon = "";
  let val = totalDelegatedBipValue + totalBipBalance;
  if (val < 1000) icon = "🎐";
  if (val >= 1000 && val < 10000) icon = "🐚";
  if (val >= 10000 && val < 100000) icon = "🦀";
  if (val >= 100000 && val < 1000000) icon = "🐠";
  if (val >= 1000000 && val < 10000000) icon = "🦈";
  if (val >= 10000000 && val < 100000000) icon = "🐋";
  if (val >= 100000000) icon = "🐬";
  return icon;
};

const getIconName = (totalDelegatedBipValue, totalBipBalance) => {
  let icon = "";
  let val = totalDelegatedBipValue + totalBipBalance;
  if (val < 1000) icon = "Ракушка";
  if (val >= 1000 && val < 10000) icon = "Креветка";
  if (val >= 10000 && val < 100000) icon = "Краб";
  if (val >= 100000 && val < 1000000) icon = "Тропическая рыбка";
  if (val >= 1000000 && val < 10000000) icon = "Акула";
  if (val >= 10000000 && val < 100000000) icon = "Кит";
  if (val >= 100000000) icon = "Дельфин";
  return icon;
};

module.exports = scoring;
