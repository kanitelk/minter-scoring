import TelegramBot from 'node-telegram-bot-api';
import Agent from 'socks5-https-client/lib/Agent';

const BotUser = require('../models/BotUser');

const config = require('../config');
const { scoring } = require('../core/main');

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

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  let user = await BotUser.findOne({ chatId: parseInt(chatId) });
  if (user === null) BotUser.create({ chatId: parseInt(chatId), req: 1 })
  else BotUser.findOneAndUpdate({ chatId: parseInt(chatId) }, { req: user.req + 1 })

  if (msg.text === '/start') {
    let text = `Добро пожаловать!\nПришлите в ответ адрес для проверки.`
    bot.sendMessage(chatId, text);
    return
  }

  console.log(msg.text);
  if (msg.text.length === 42) {
    bot.sendMessage(chatId, 'Проверяем адрес...\nЭто займет несколько секунд... ☘️');

    let send = await scoring(msg.text)
    if (send === null || typeof send === 'undefined') {
      bot.sendMessage(chatId, 'Ошибка при проверке');
    } else {

      const opts = {
        parse_mode: 'Markdown'
      };

      let age = new Date();
      age.setTime(send.age);

      let genesisString = '';
      if (send.genesis === true) genesisString = 'Да ✔'
      else (genesisString = 'Нет')

      let levelString;
      if (send.score < 10) levelString = 'Очень низкий'
      if (send.score >= 10 && send.score < 27) levelString = 'Низкий'
      if (send.score >= 27 && send.score < 35) levelString = 'Ниже среднего'
      if (send.score >= 35 && send.score < 45) levelString = 'Средний'
      if (send.score >= 45 && send.score < 65) levelString = 'Выше среднего'
      if (send.score >= 65 && send.score < 100) levelString = 'Высокий'
      if (send.score === 100) levelString = 'Очень высокий'

      let coins = 'Нет';
      if (send.coins.length > 0) {
        coins = send.coins.map((item) => item.symbol).join(', ')
      }

      let level = ('' + send.totalBip)[0];
      let smart_expert, smart_rating;
      if (send.smart_expert > 0) {
        smart_expert = `\nSMART(X) Expert (${send.smart_expert}) ✅`
      } else smart_expert = '';
      if (send.smart_rating > 0) {
        smart_rating = `\nSMART(X) Project Rating (${send.smart_rating}) ✅`
      } else smart_rating = '';

      send = `${send.icon} ${send.address.substr(0, 12) + '...' + send.address.slice(-8)} \n${send.iconName} ${level}-го уровня\n\nKARMA (баланс): ${Math.round(send.balanceKarma * 100000) / 100000} ☘️ \nKARMA (делегировано): ${Math.round(send.delegatedKarma * 100000) / 100000} ☘️ \nKARMA (получено): ${Math.round(send.receivedKarma * 100000) / 100000} ☘️ \n\nВозраст: ${Math.floor(+((new Date().getTime() - age.getTime()) / 86400000))} дней 📅 \nGenesis (& KYC): ${genesisString} \n\nДелегировано: ${send.totalDelegatedBip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIP \nТранзакции: ${send.transactions} \n\nСозданные монеты: ${coins}\nЛиквидировано монет: ${send.coins.length - send.existCoins} \n\nБлагодарности: ${send.respectTx.length} 👍\nЖалобы: ${send.scamTx.length}  👎\nВерификации: ${send.verificationTx.length} 🤝 ${smart_expert} ${smart_rating} \n\n*Скоринг: ${send.score}/100*\n*Уровень доверия: ${levelString}* \n\n🔻 Больше информации:\nhttps://scoring.minter.work/?address=${send.address}`

      bot.sendMessage(chatId, send, opts)
    }

  } else {
    bot.sendMessage(chatId, 'Проверьте правильность адреса (Mx...)');
  }
});

module.exports = bot;