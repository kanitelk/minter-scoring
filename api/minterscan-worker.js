const db = require("./db");
const superagent = require("superagent");
const cron = require("node-cron");

const Profile = require('./models/MinterscanProfile');

const getAllProfiles = async function () {
  const responce = await superagent
    .get('http://minterscan.pro/profiles')

  return responce.body;
}

const updateProfiles = async () => {
  let res;

  try {
    res = await getAllProfiles();
  } catch (error) {
    console.log('Error while getting profiles');
    return;
  }


  res = res.map(item => {
    let profile = item;
    profile._id = item.address;
    profile.full_icon = item.icon;
    profile.icon = item.icons.jpg;
    return profile;
  })

  await Profile.deleteMany({});

  Profile.insertMany(res, (err, res) => {
    if (err) console.log(err);
    else console.log(`Minterscan profiles updated: ${res.length}`);
  })
}

// Update now
updateProfiles();

// Shedule update (every 30 mins )
cron.schedule('* 30 * * * *', () => {
  updateProfiles();
})