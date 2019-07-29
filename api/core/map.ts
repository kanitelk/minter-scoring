const base64 = require('js-base64').Base64;
const utils = require('../controllers/utils');
const fs = require("fs");
const Wallet = require("../models/Wallet");
import { config } from '../config';

const { Minter } = require('minter-js-sdk');
const minterSDK = new Minter({ apiType: 'node', baseURL: config.nodeURL });

exports.getMap = async (address: string, deepLevel: number) => {
  const transactions = await utils.getAllTransactions(address);

  let sendTx = [];
  let receiveTx = [];

  for (let i = 0; i < transactions.length; i++) {
    let tx = transactions[i];
    if (tx.type === 1) {
      if (tx.from === address) sendTx.push(tx);
      if (tx.data.to === address) receiveTx.push(tx);
    }

  }
}