import express from 'express';
const router = express.Router();
const bodyParser = require("body-parser");
const utils = require('./utils');

const { scoring } = require('../core/main');
const { getMap } = require('../core/map');

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

router.use(bodyParser.json());

router.get('/', async (req, res) => {
  res.status(200).send('Api works! Use /:wallet route');
});

router.get('/:wallet', async (req, res) => {
  if (req.params.wallet.length !== 42) res.status(200).send('error: incorrect address');
  let send = await scoring(req.params.wallet);
  res.status(200).send(send);
});

router.get('/map/:wallet', async (req, res) => {
  if (req.params.wallet.length !== 42) res.status(200).send('error: incorrect address');
  let send = await getMap(req.params.wallet);
  res.status(200).send(send);
});

// router.get('/info/:wallet', async (req, res) => {
//   let send = await utils.getAddressInfo(req.params.wallet)
//   res.status(200).send(send);
// });

// router.get('/delegated/:wallet', async (req, res) => {
//   let send = await utils.getDelagations(req.params.wallet)
//   res.status(200).send(send);
// });

// router.get('/transactions/:wallet', async (req, res) => {
//   let send = await utils.getTransactions(req.params.wallet)
//   res.status(200).send(send);
// });


module.exports = router;
