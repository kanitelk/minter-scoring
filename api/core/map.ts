const base64 = require('js-base64').Base64;
const utils = require('../controllers/utils');
const fs = require("fs");
const Wallet = require("../models/Wallet");
import { config } from '../config';

const { Minter } = require('minter-js-sdk');
const minterSDK = new Minter({ apiType: 'node', baseURL: config.nodeURL });

exports.getMap = async (address, deepLevel) => {
  return 'hello';
  const transactions = await utils.getAllTransactions(address);
}