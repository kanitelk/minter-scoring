const fs = require("fs");
const db = require("../db");
const Genesis = require('../models/Genesis');

const file = fs.readFileSync(__dirname + "/genesis.json");

const setGenesis = async () => {
  let walletsArray = JSON.parse(file);
  let genesisArr = walletsArray.app_state.frozen_funds;

  genesisArr = genesisArr.map(item => {
    return {
      address: item.address,
      block: item.height,
      value: Number(item.value / 1000000000000000000)
    }
  })

  await Genesis.deleteMany({});
  Genesis.insertMany(genesisArr, (err, res) => {
    if (err) console.log(err);
    else console.log(`Inserted ${res.length} genesis items`);
  })
}

setGenesis();
