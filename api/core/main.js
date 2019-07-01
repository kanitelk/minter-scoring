const config = require('../config');
const base64 = require('js-base64').Base64;
const utils = require('../controllers/utils');
const fs = require("fs");
const Wallet = require("../models/Wallet");

exports.scoring = async (address) => {
  let wallet = await Wallet.findOne({ address: address })

  if (wallet === null) {
    let newWallet = await getRating(address, wallet);
    // genesis check
    const file = fs.readFileSync(__dirname + "/genesis.json");
    let walletsArray = JSON.parse(file);
    let genesisArr = walletsArray.app_state.frozen_funds;

    let genesisStatus = false;

    for (let i = 0; i < genesisArr.length; i++) {
      if (genesisArr[i].address === address) {
        genesisStatus = true;
        break;
      }
    }
    newWallet.genesis = genesisStatus;
    //genesys & kyc bonus
    if (genesisStatus === true) newWallet.score += 25;
    if (newWallet.score > 100) newWallet.score = 100;
    return await Wallet.create(newWallet);
  } else {
    if ((new Date() - wallet.updatedAt) > (config.updateDuration * 1000)) {

      let newWallet = await getRating(address, wallet);
      Wallet.findByIdAndUpdate(wallet._id, newWallet, (err, res) => {
        if (err) return console.log('Update wallet err: ', err)
      });
      return newWallet;
    } else return wallet
  }
}

const getRating = async (address, wallet = null) => {
  try {
    let score = 0;

    let balances = await utils.getAddressInfo(address);
    let delegations = await utils.getDelegations(address);
    let transactions = await utils.getTransactions(address);
    let coins = await utils.getCoins()
    let totalDelegatedBipValue = Math.round(delegations.meta.additional.total_delegated_bip_value);

    let totalBipBalance = 0;

    let icon = getIcon(totalDelegatedBipValue, totalBipBalance);
    let iconName = getIconName(totalDelegatedBipValue, totalBipBalance);

    balances.forEach(item => {
      let coin = getCoin(coins, item.coin);
      console.log(coin);

      let bips = (+coin.reserveBalance) * (1 - (1 - (+item.amount) / (+coin.volume)) ** (1 / coin.crr)) * 100;

      if (item.coin === 'BIP') {
        item.bip_value = (+item.amount);
        totalBipBalance += (+item.amount);
      } else {
        item.bip_value = bips;
        totalBipBalance += bips;
      }
    });

    delegations = delegations.data;
    let delegatedKarma = getDelegatedKarma(delegations);
    let balanceKarma = getBalanceKarma(balances);
    let receivedKarma = 0;

    score += scoreDelegations(delegations, totalDelegatedBipValue);
    score += scoreBalances(balances);
    score += scoreTransactions(transactions);
    score += scoreDelegatedKarma(delegatedKarma);

    if (score > 100) score = 100;
    let scamTx = [], respectTx = [], verificationTx = [], coinsTx = [];
    let smart_expert = 0, smart_rating = 0;

    //transactions checker
    if (transactions.length === undefined) return;
    for (let i = 0; i < transactions.length; i++) {
      // Receive to wallet karma
      if (transactions[i].data.to === address && transactions[i].data.coin === 'KARMA') {
        receivedKarma += +(transactions[i].data.value);
      }
      // Receive to wallet karma MULTISEND
      if (
        transactions[i].from === 'Mx12537fc0b58c4b26c74b2b8f3bed50c47557119c' &&
        transactions[i].payload === "R0VORVNJUyBLWUMgT0s=") {
        receivedKarma += 0.0175796;
      }
      // Minus send to wallet karma
      if (transactions[i].from === address && transactions[i].data.coin === 'KARMA') {
        receivedKarma -= +(transactions[i].data.value);
      }
      // Smart get EXPERT
      if (transactions[i].from === 'Mx4dd17ad8d43ac35c9449f11ab150d27f8833540e' && transactions[i].data.coin === 'EXPERT') {
        smart_expert += +(transactions[i].data.value);
        score += 5;
      }
      // Smart get RATING
      if (transactions[i].from === 'Mx3224b7d1a85d972c0831f9fec27b9127cde4e54b' && transactions[i].data.coin === 'RATING') {
        smart_expert += +(transactions[i].data.value);
        score += 5;
      }
      // Create coins Tx
      if (transactions[i].type == 5) {
        coinsTx.push(transactions[i].data);
      }
      // SCAM
      if (transactions[i].data.to === address && base64.decode(transactions[i].payload).toLowerCase().includes('scam')) {
        if (base64.decode(transactions[i].payload).toLowerCase().includes('antiscam')) {
          respectTx.push(transactions[i]);
          continue;
        }
        scamTx.push(transactions[i]);
        continue;
      }
      // RESPECT
      if (transactions[i].data.to === address && base64.decode(transactions[i].payload).toLowerCase().includes('respect')) {
        respectTx.push(transactions[i]);
        continue;
      }
      // VERIFICATION
      if (transactions[i].data.to === address && base64.decode(transactions[i].payload).toLowerCase().includes('verification')) {
        verificationTx.push(transactions[i]);
        continue;
      }
    }

    if (receivedKarma < 0) receivedKarma = 0;

    let existCoins = 0;
    if (coinsTx.length > 0) {
      for (let i = 0; i < coinsTx.length; i++) {
        for (j = 0; j < coins.length; j++) {
          if (coins[j].symbol === coinsTx[i].symbol) {
            existCoins += 1;
            break;
          }
        }
      }
    }

    if (wallet === null) {
      tLenght = transactions.length;
      age = transactions[tLenght - 1].timestamp;
      return {
        address: address,
        balances: balances,
        score: score,
        transactions: transactions.length,
        scamTx: scamTx,
        respectTx: respectTx,
        verificationTx: verificationTx,
        totalDelegatedBip: totalDelegatedBipValue,
        totalBip: totalDelegatedBipValue + totalBipBalance,
        age: age,
        delegatedKarma: delegatedKarma,
        balanceKarma: balanceKarma,
        receivedKarma: receivedKarma,
        icon: icon,
        iconName: iconName,
        coins: coinsTx,
        existCoins: existCoins,
        smart_expert: smart_expert,
        smart_rating: smart_rating,
        updatedAt: new Date(),
      }
    } else {
      let genesis = false
      if (wallet.genesis === true) {
        score += 25;
        genesis = true;
      }
      if (score > 100) score = 100;

      return {
        address: address,
        balances: balances,
        score: score,
        transactions: transactions.length,
        scamTx: scamTx,
        respectTx: respectTx,
        verificationTx: verificationTx,
        totalDelegatedBip: totalDelegatedBipValue,
        totalBip: totalDelegatedBipValue + totalBipBalance,
        coins: coinsTx,
        icon: icon,
        iconName: iconName,
        genesis: genesis,
        age: wallet.age,
        delegatedKarma: delegatedKarma,
        balanceKarma: balanceKarma,
        receivedKarma: receivedKarma,
        existCoins: existCoins,
        smart_expert: smart_expert,
        smart_rating: smart_rating,
        updatedAt: new Date()
      }
    }
  }
  catch (error) {
    console.log(error);
    return null
  }
}

const getCoin = (coins, coin_name) => {
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].symbol == coin_name) {
      return coins[i];
    }
  }
}

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
}

const getDelegatedKarma = (delegations) => {
  let res = 0;
  for (let i = 0; i < delegations.length; i++) {
    if (delegations[i].coin === 'KARMA') {
      res = res + (+(delegations[i].value));
    }
  }
  return res;
}

const getBalanceKarma = (balances) => {
  let val = 0;
  for (let i = 0; i < balances.length; i++) {
    if (balances[i].coin === 'KARMA') {
      val += +balances[i].amount;
    }
  }
  return val;
}

const scoreBalances = (balances) => {
  let score = 0;

  // COINS NUMBER
  if (balances.length === 0) score += 0;
  if (balances.length === 1) score += 1;
  if (balances.length > 3 && balances.length < 6) score += 2;
  if (balances.length >= 6) score += 3;

  for (let i = 0; i < balances.length; i++) {
    // BIP
    if (balances[i].coin === 'BIP') {
      if (balances[i].amount >= 300 && balances[i].amount < 1000) score += 1;
      if (balances[i].amount >= 1000 && balances[i].amount < 10000) score += 3;
      if (balances[i].amount >= 10000 && balances[i].amount < 100000) score += 25;
      if (balances[i].amount >= 100000 && balances[i].amount < 1000000) score += 60;
      if (balances[i].amount >= 1000000) score += 100;
    }

    // KARMA
    if (balances[i].coin === 'KARMA') {
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
}

const scoreDelegatedKarma = (val) => {
  let score = 0;
  if (val > 0 && val < 0.001) score += 1;
  if (val >= 0.001 && val < 0.01) score += 3;
  if (val >= 0.01 && val < 0.1) score += 10;
  if (val >= 0.1 && val < 1) score += 30;
  if (val >= 1 && val < 10) score += 50;
  if (val >= 10) score += 100;
  return score;
}

const scoreTransactions = (transactions) => {
  let score = 0;
  if (transactions.length > 0 && transactions.length < 10) score += 0;
  if (transactions.length >= 10 && transactions.length < 50) score += 1;
  if (transactions.length >= 10 && transactions.length < 50) score += 2;
  if (transactions.length >= 50 && transactions.length < 200) score += 4;
  if (transactions.length >= 200 && transactions.length < 600) score += 7;
  if (transactions.length >= 600) score += 10;

  return score;
}

const getIcon = (totalDelegatedBipValue, totalBipBalance) => {
  let icon = '';
  let val = totalDelegatedBipValue + totalBipBalance;
  if (val < 1000) icon = '🎐';
  if (val >= 1000 && val < 10000) icon = '🐚';
  if (val >= 10000 && val < 100000) icon = '🦀';
  if (val >= 100000 && val < 1000000) icon = '🐠';
  if (val >= 1000000 && val < 10000000) icon = '🦈';
  if (val >= 10000000 && val < 100000000) icon = '🐋';
  if (val >= 100000000) icon = '🐬';
  return icon;
}

const getIconName = (totalDelegatedBipValue, totalBipBalance) => {
  let icon = '';
  let val = totalDelegatedBipValue + totalBipBalance;
  if (val < 1000) icon = 'Ракушка';
  if (val >= 1000 && val < 10000) icon = 'Креветка';
  if (val >= 10000 && val < 100000) icon = 'Краб';
  if (val >= 100000 && val < 1000000) icon = 'Тропическая рыбка';
  if (val >= 1000000 && val < 10000000) icon = 'Акула';
  if (val >= 10000000 && val < 100000000) icon = 'Кит';
  if (val >= 100000000) icon = 'Дельфин';
  return icon;
}