const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const scoring = require("../core/main");
const Wallet = require("../models/Wallet");
const Profile = require("../models/MinterscanProfile");

const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 15,
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

router.use(bodyParser.json());

router.get("/", async (req, res) => {
  res.status(200).send("API works! Use /:wallet or /score/:wallet route");
});

router.get("/:wallet", apiLimiter, async (req, res) => {
  if (req.params.wallet.length !== 42)
    res.status(200).send("error: incorrect address");
  let send = await scoring(req.params.wallet);
  res.status(200).send(send);
});

router.get("/score/:wallet", async (req, res) => {
  if (req.params.wallet.length !== 42)
    res.status(200).send("error: incorrect address");

  let wallet = await Wallet.findById(req.params.wallet);
  let profile = await Profile.findById(req.params.wallet);

  if (wallet === null) {
    res
      .status(404)
      .send("Scoring for this address has not yet been calculated");
    return;
  }

  let send = {
    address: wallet.address,
    score: wallet.score,
    icon: wallet.icon,
    iconName: wallet.iconName,
    profile: profile
  };

  res.status(200).send(send);
});

router.get("/profile/:wallet", async (req, res) => {
  if (req.params.wallet.length !== 42)
    res.status(200).send("error: incorrect address");

  let profile = await Profile.findById(req.params.wallet);

  if (profile === null) {
    res.status(404).send("Minterscan profile not found for this address");
    return;
  }

  res.status(200).send(profile);
});

module.exports = router;
