const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');

const db = require('./db');

const BotUser = require('./models/BotUser');

const config = require('./config');

const bot = new TelegramBot(config.botToken, {
  polling: true, request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: config.socksHost,
      socksPort: config.socksPort,
      socksUsername: config.socksUsername,
      socksPassword: config.socksPassword
    }
  }
});

let text = `Здравстуйте! \n
Мы подвели итоги недели и выпустили обновление скоринга.
Подробности: https://t.me/minterw/131 \n
P.S: Не забывайте про монету SCORING. 
Рекомендуем к покупке :)
`;

BotUser.find({}, async (err, res) => {
  const chats = res.map(item => item.chatId)
  console.log(chats.length);
  let ok = 0;

  for (let i = 0; i < chats.length; i++) {
    bot.sendMessage(chats[i], text, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    }).then((res) => {
      console.log(i);
      ok++
    })
  }

})



module.exports = bot;